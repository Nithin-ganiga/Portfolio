import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      phase: number;
      color: string;
    }> = [];

    const colors = [
      "59, 130, 246",   // blue
      "34, 197, 94",    // green
      "168, 85, 247",   // purple
      "6, 182, 212",    // cyan
      "239, 68, 68",    // red
    ];

    // Create particles with slower, more graceful movement
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.4 + 0.2,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008; // Very slow time progression

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Gentle sinusoidal floating motion - no mouse interaction
        particle.vx += Math.sin(time + particle.phase) * 0.001;
        particle.vy += Math.cos(time + particle.phase * 1.3) * 0.001;

        // Apply very gentle damping for smooth movement
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Soft boundary bouncing
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Gentle opacity breathing effect
        const breathingOpacity = particle.opacity + Math.sin(time * 2 + particle.phase) * 0.1;
        const currentOpacity = Math.max(0.1, Math.min(0.6, breathingOpacity));

        // Draw particle with soft glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `rgba(${particle.color}, ${currentOpacity})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw subtle connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const lineOpacity = 0.15 * (1 - distance / 120);
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(${particle.color}, ${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
