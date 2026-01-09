'use client';
import React, { useRef, useEffect } from 'react';

type FlowProps = {
  burstMode: boolean;
};

const Flow: React.FC<FlowProps> = ({ burstMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef(false);

  // Keep an up-to-date burst flag available inside the animation loop
  useEffect(() => {
    burstRef.current = burstMode;
  }, [burstMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };
    const numParticles = 2000; // High density for the "river" look

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

      update(w: number, h: number, isBursting: boolean, originX: number, originY: number) {
        // 1. THE FLOW (The River)
        // Using a smooth sine/cosine field to create the "flowing" motion
        const flowAngle = (Math.sin(this.x * 0.005) + Math.cos(this.y * 0.005)) * Math.PI;
        const baseFlowStrength = isBursting ? 0.05 : 0.1;
        this.vx += Math.cos(flowAngle) * baseFlowStrength;
        this.vy += Math.sin(flowAngle) * baseFlowStrength;

        // 2. THE GRAVITY (The Interaction)
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

        // 2b. THE BURST (Button Interaction)
        if (isBursting) {
          const bx = this.x - originX;
          const by = this.y - originY;
          const bDist = Math.sqrt(bx * bx + by * by) || 1;
          const burstForce = 1.2; // gentler, but still clearly visible

          // Push particles outward from the origin
          this.vx += (bx / bDist) * burstForce;
          this.vy += (by / bDist) * burstForce;
        }

        // 3. PHYSICS & BOUNDARIES
        // When not bursting, stronger damping to let particles ease back in.
        const damping = isBursting ? 0.97 : 0.93;
        this.vx *= damping;
        this.vy *= damping;
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

    const animate = () => {
      // Use a slightly transparent black for subtle "motion blur" trails
      ctx.fillStyle = 'rgba(10, 10, 10, 0.3)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#333333'; // Dark gray particles
      const isBursting = burstRef.current;

      // Use mouse position as burst origin when on-screen, otherwise center
      const hasMouse =
        mouse.x >= 0 && mouse.x <= canvas.width && mouse.y >= 0 && mouse.y <= canvas.height;
      const originX = hasMouse ? mouse.x : canvas.width / 2;
      const originY = hasMouse ? mouse.y : canvas.height / 2;

      particles.forEach(p => {
        p.update(canvas.width, canvas.height, isBursting, originX, originY);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default Flow;