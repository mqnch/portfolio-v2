"use client";
import React, { useRef, useEffect } from "react";

const Flow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
      x: number;
      y: number;
      vx: number;
      vy: number;
      speed: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = 0;
        this.vy = 0;
        this.speed = Math.random() * 0.5 + 0.2; // Individual drift speed
      }

      update(w: number, h: number, dt: number) {
        // 1. THE FLOW (The River)
        // Using a smooth sine/cosine field to create the "flowing" motion
        const flowAngle =
          (Math.sin(this.x * 0.005) + Math.cos(this.y * 0.005)) * Math.PI;
        this.vx += Math.cos(flowAngle) * 0.1 * dt;
        this.vy += Math.sin(flowAngle) * 0.1 * dt;

        // 2. THE GRAVITY (The Mouse Interaction)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 22500) { // 150 * 150
          const dist = Math.sqrt(distSq);
          const force = (150 - dist) / 150;
          // Pull toward mouse but with a slight "swirl"
          const pullAngle = Math.atan2(dy, dx) + Math.PI / 6;
          this.vx += Math.cos(pullAngle) * force * 0.8 * dt;
          this.vy += Math.sin(pullAngle) * force * 0.8 * dt;
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
            this.vx += radialX * RADIAL_PUSH_STRENGTH * dt;
            this.vy += radialY * RADIAL_PUSH_STRENGTH * dt;

            // Orbital motion (tangential force)
            // Perpendicular to radial direction (rotate 90 degrees)
            const tangentialX = -by / (bDist || 1);
            const tangentialY = bx / (bDist || 1);

            this.vx += tangentialX * ORBITAL_STRENGTH * dt;
            this.vy += tangentialY * ORBITAL_STRENGTH * dt;
          }
        }

        // 4. PHYSICS & BOUNDARIES
        // Keep friction constant per frame for a better "glide" feel
        this.vx *= 0.96;
        this.vy *= 0.96;
        
        this.x += this.vx * this.speed * dt;
        this.y += this.vy * this.speed * dt;

        // Wrap around edges like a continuous stream
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        // Individual particles are small points
        const size = this.speed > 0.6 ? 1.5 : 1;
        context.fillRect(this.x, this.y, size, size);
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // This ensures your CSS coordinates still match the drawing surface
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.scale(dpr, dpr); // Scale all drawing operations automatically
      
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(window.innerWidth, window.innerHeight));
      }
    };

    const updateOrbitalPosition = (clientX: number, clientY: number) => {
      // Since the canvas is fixed and full-screen at (0,0), 
      // clientX/Y are already in logical coordinates.
      orbitalState = {
        x: clientX,
        y: clientY,
      };
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

    let lastTime = 0;
    let accumulator = 0;
    const TARGET_FPS = 144;
    const SIMULATION_STEP = 1000 / TARGET_FPS; // ~6.94ms per tick

    // This locks in the exact math your 144Hz monitor was producing natively.
    const FIXED_DT = (SIMULATION_STEP / 16.67) * 3.2; 

    const animate = (time: number) => {
      if (!lastTime) {
        lastTime = time;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      const frameTime = time - lastTime;
      lastTime = time;
      
      // Accumulate elapsed time, capped at 100ms to prevent the "spiral of death" 
      // if the user switches browser tabs and returns.
      accumulator += Math.min(frameTime, 100); 

      // 1. UPDATE PHYSICS (Runs as many times as needed to catch up to 144Hz)
      while (accumulator >= SIMULATION_STEP) {
        particles.forEach(p => {
          p.update(window.innerWidth, window.innerHeight, FIXED_DT);
        });
        accumulator -= SIMULATION_STEP;
      }

      // 2. RENDER GRAPHICS (Runs exactly once per screen refresh)
      ctx.fillStyle = "rgba(10, 10, 10, 0.14)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        const brightness = 120 + Math.floor(p.speed * 80);
        const blueTint = p.speed > 0.5 ? 25 : 0;
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness + blueTint}, 0.3)`;
        p.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    init();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default Flow;
