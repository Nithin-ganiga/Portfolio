import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
  phase: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const createParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor((width * height) / 15000)); // Responsive particle count

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: 0,
        baseOpacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 60 + 200, // Blue to cyan range
        phase: Math.random() * Math.PI * 2
      });
    }
    return particles;
  }, []);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle, time: number) => {
    // Smooth opacity breathing
    const breathingOpacity = particle.baseOpacity + Math.sin(time * 0.001 + particle.phase) * 0.1;
    particle.opacity = Math.max(0.05, Math.min(0.4, breathingOpacity));

    // Create gradient for smooth appearance
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size * 3
    );
    
    gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`);
    gradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.3})`);
    gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  }, []);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.1;
          const avgHue = (particles[i].hue + particles[j].hue) / 2;
          
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(${avgHue}, 70%, 60%, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let time = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      
      ctx.scale(dpr, dpr);
      particlesRef.current = createParticles(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      time += 16; // Consistent 60fps timing
      
      const particles = particlesRef.current;
      
      // Update particles
      particles.forEach((particle) => {
        // Gentle floating motion
        const floatX = Math.sin(time * 0.0008 + particle.phase) * 0.2;
        const floatY = Math.cos(time * 0.0006 + particle.phase * 1.5) * 0.15;
        
        particle.vx += floatX * 0.01;
        particle.vy += floatY * 0.01;

        // Subtle mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) + 
          Math.pow(particle.y - mouseRef.current.y, 2)
        );
        
        if (mouseDistance < 100) {
          const force = (100 - mouseDistance) / 100;
          const angle = Math.atan2(
            particle.y - mouseRef.current.y, 
            particle.x - mouseRef.current.x
          );
          particle.vx += Math.cos(angle) * force * 0.02;
          particle.vy += Math.sin(angle) * force * 0.02;
        }

        // Apply velocity with damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Smooth boundary wrapping
        if (particle.x < -20) particle.x = rect.width + 20;
        if (particle.x > rect.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = rect.height + 20;
        if (particle.y > rect.height + 20) particle.y = -20;

        drawParticle(ctx, particle, time);
      });

      // Draw connections
      drawConnections(ctx, particles);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticles, drawParticle, drawConnections]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        background: "transparent",
        width: "100vw",
        height: "100vh"
      }}
    />
  );
}
