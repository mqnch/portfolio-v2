'use client';
import React, { useRef, useEffect } from 'react';

const Flow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };
    const numParticles = 2000; 

    let orbitalState: {
      x: number;
      y: number;
    } | null = null;
    let isMouseDown = false;

    const ORBITAL_RADIUS = 100; 
    const RADIAL_PUSH_STRENGTH = 1; 
    const ORBITAL_STRENGTH = 0.01; 

    class Particle {
      x: number; y: number;
      vx: number; vy: number;
      speed: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = 0;
        this.vy = 0;
        this.speed = Math.random() * 0.5 + 0.2; // Individual drift speed
      }

      update(w: number, h: number) {
        // 1. THE FLOW (The River)
        // Using a smooth sine/cosine field to create the "flowing" motion
        const flowAngle = (Math.sin(this.x * 0.005) + Math.cos(this.y * 0.005)) * Math.PI;
        this.vx += Math.cos(flowAngle) * 0.1;
        this.vy += Math.sin(flowAngle) * 0.1;

        // 2. THE GRAVITY (The Mouse Interaction)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          // Pull toward mouse but with a slight "swirl"
          const pullAngle = Math.atan2(dy, dx) + (Math.PI / 6);
          this.vx += Math.cos(pullAngle) * force * 0.8;
          this.vy += Math.sin(pullAngle) * force * 0.8;
        }

        // 3. ORBITAL INTERACTION (Mouse held down)
        if (orbitalState && isMouseDown) {
          const ox = orbitalState.x;
          const oy = orbitalState.y;
          const bx = this.x - ox;
          const by = this.y - oy;
          const bDist = Math.sqrt(bx * bx + by * by);
          
          // Only affect particles within orbital radius
          if (bDist < ORBITAL_RADIUS) {
            // Radial push away from mouse position
            const radialX = bx / (bDist || 1);
            const radialY = by / (bDist || 1);
            this.vx += radialX * RADIAL_PUSH_STRENGTH;
            this.vy += radialY * RADIAL_PUSH_STRENGTH;
            
            // Orbital motion (tangential force)
            // Perpendicular to radial direction (rotate 90 degrees)
            const tangentialX = -by / (bDist || 1);
            const tangentialY = bx / (bDist || 1);
            
            this.vx += tangentialX * ORBITAL_STRENGTH;
            this.vy += tangentialY * ORBITAL_STRENGTH;
          }
        }

        // 4. PHYSICS & BOUNDARIES
        this.vx *= 0.96; // Friction
        this.vy *= 0.96;
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;

        // Wrap around edges like a continuous stream
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillRect(this.x, this.y, 1, 1);
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const updateOrbitalPosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      
      // Check if position is within canvas bounds
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;
        
        // Scale coordinates to match canvas internal size (handles high-DPI displays)
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        // Update orbital state
        orbitalState = {
          x: clickX * scaleX,
          y: clickY * scaleY,
        };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      updateOrbitalPosition(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      orbitalState = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Update orbital position while mouse is held down
      if (isMouseDown) {
        updateOrbitalPosition(e.clientX, e.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      isMouseDown = true;
      const touch = e.touches?.[0];
      if (touch) {
        updateOrbitalPosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      isMouseDown = false;
      orbitalState = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches?.[0];
      if (touch) {
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        
        // Update orbital position while touch is active
        if (isMouseDown) {
          updateOrbitalPosition(touch.clientX, touch.clientY);
        }
      }
    };

    const animate = () => {
      // Use a slightly transparent black for subtle "motion blur" trails
      ctx.fillStyle = 'rgba(10, 10, 10, 0.3)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#333333'; // Dark gray particles

      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default Flow;
