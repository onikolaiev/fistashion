"use client";

import { useEffect, useRef } from "react";

type SteamEffectProps = {
  width?: number;
  height?: number;
  opacity?: number;
  cupScale?: number;
  reducedMotion?: boolean;
};

type PuffParticle = {
  startX: number;
  startY: number;
  x: number;
  y: number;
  vy: number;
  life: number;
  maxLife: number;
  baseRadius: number;
  maxRadius: number;
  baseAlpha: number;
  swayFreq: number;
  swayAmp: number;
  phase: number;
  aspect: number;
  rotation: number;
  rotSpeed: number;
};

export function SteamEffect({
  width = 220,
  height = 320,
  opacity = 0.88,
  cupScale = 1.0,
  reducedMotion = false,
}: SteamEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = width / 2;
    const baseY = height - 10;

    if (reducedMotion) {
      // Gentle, subtle static vapor haze for reduced motion preference
      const grad = ctx.createRadialGradient(centerX, baseY - 35, 0, centerX, baseY - 35, 45);
      grad.addColorStop(0, "rgba(255, 250, 240, 0.08)");
      grad.addColorStop(0.6, "rgba(245, 235, 215, 0.03)");
      grad.addColorStop(1, "rgba(240, 230, 205, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(centerX, baseY - 35, 28, 48, 0, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    const scaleFactor = Math.min(Math.max(cupScale, 0.75), 1.5);
    const rx = 28 * scaleFactor;
    const ry = 8 * scaleFactor;

    // Organic wisp streams (soft, twisting volumetric vapor strands)
    const strands = [
      { offset: -12 * scaleFactor, speed: 0.95, amp: 15 * scaleFactor, freq: 0.015, phase: 0.0, alpha: 0.16 },
      { offset: 6 * scaleFactor, speed: 1.15, amp: 18 * scaleFactor, freq: 0.012, phase: 2.3, alpha: 0.18 },
      { offset: -2 * scaleFactor, speed: 0.75, amp: 11 * scaleFactor, freq: 0.018, phase: 4.5, alpha: 0.14 },
    ];

    // Surrounding vapor puffs for organic billow volume
    const puffCount = 38;
    const puffs: PuffParticle[] = [];

    const createPuff = (randomizeLife = false): PuffParticle => {
      const maxLife = 3.2 + Math.random() * 1.8;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.sqrt(Math.random());
      const startX = centerX + Math.cos(angle) * dist * rx;
      const startY = baseY + Math.sin(angle) * dist * ry;

      return {
        startX,
        startY,
        x: startX,
        y: startY,
        vy: -(28 + Math.random() * 24),
        life: randomizeLife ? Math.random() * maxLife : 0,
        maxLife,
        baseRadius: (8 + Math.random() * 6) * scaleFactor,
        maxRadius: (28 + Math.random() * 20) * scaleFactor,
        baseAlpha: (0.06 + Math.random() * 0.05) * opacity,
        swayFreq: 0.7 + Math.random() * 0.8,
        swayAmp: (9 + Math.random() * 12) * scaleFactor,
        phase: Math.random() * Math.PI * 2,
        aspect: 0.8 + Math.random() * 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.4,
      };
    };

    for (let i = 0; i < puffCount; i++) {
      puffs.push(createPuff(true));
    }

    let animationFrameId: number;
    let lastTime = performance.now();
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;
      const t = now / 1000;

      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // --- LAYER 1: Subtle breathing thermal cushion directly over latte foam ---
        const breath = Math.sin(t * 1.5) * 0.015;
        const baseAlpha = (0.06 + breath) * opacity;
        const baseHazeGrad = ctx.createRadialGradient(
          centerX,
          baseY - 2,
          0,
          centerX,
          baseY - 2,
          32 * scaleFactor
        );
        baseHazeGrad.addColorStop(0, `rgba(255, 252, 246, ${baseAlpha.toFixed(3)})`);
        baseHazeGrad.addColorStop(0.5, `rgba(246, 238, 222, ${(baseAlpha * 0.5).toFixed(3)})`);
        baseHazeGrad.addColorStop(1, "rgba(240, 230, 205, 0)");

        ctx.save();
        ctx.scale(1.0, 0.32);
        ctx.fillStyle = baseHazeGrad;
        ctx.beginPath();
        ctx.arc(centerX, (baseY - 2) / 0.32, 32 * scaleFactor, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // --- LAYER 2: Organic Silky Vapor Strands (multi-pass feathered curves) ---
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (const strand of strands) {
          const startX = centerX + strand.offset;
          const points: { x: number; y: number }[] = [];
          const totalSteps = 28;

          for (let i = 0; i <= totalSteps; i++) {
            const progress = i / totalSteps;
            const y = baseY - progress * (height - 20);
            const wave1 = Math.sin(t * strand.speed + (baseY - y) * strand.freq + strand.phase);
            const wave2 = Math.cos(t * (strand.speed * 0.65) + (baseY - y) * (strand.freq * 1.8) + strand.phase * 1.3);
            const x = startX + wave1 * strand.amp * Math.pow(progress, 0.75) + wave2 * (strand.amp * 0.35) * progress;
            points.push({ x, y });
          }

          // Render path through points
          const drawStrandPath = () => {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length - 1; i++) {
              const xc = (points[i].x + points[i + 1].x) / 2;
              const yc = (points[i].y + points[i + 1].y) / 2;
              ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }
            ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
          };

          // Vertical gradient matching natural steam light
          const grad = ctx.createLinearGradient(startX, baseY, startX, 20);
          const a = strand.alpha * opacity;
          grad.addColorStop(0, "rgba(255, 252, 246, 0)");
          grad.addColorStop(0.12, `rgba(255, 252, 246, ${(a * 0.7).toFixed(3)})`);
          grad.addColorStop(0.40, `rgba(246, 238, 224, ${a.toFixed(3)})`);
          grad.addColorStop(0.75, `rgba(238, 226, 206, ${(a * 0.35).toFixed(3)})`);
          grad.addColorStop(1, "rgba(235, 222, 195, 0)");

          ctx.strokeStyle = grad;

          // Pass A: Outer soft volumetric halo
          ctx.lineWidth = 22 * scaleFactor;
          ctx.globalAlpha = 0.28;
          drawStrandPath();
          ctx.stroke();

          // Pass B: Mid-body wisp
          ctx.lineWidth = 12 * scaleFactor;
          ctx.globalAlpha = 0.55;
          drawStrandPath();
          ctx.stroke();

          // Pass C: Inner glowing filament
          ctx.lineWidth = 5 * scaleFactor;
          ctx.globalAlpha = 0.85;
          drawStrandPath();
          ctx.stroke();
        }
        ctx.restore();

        // --- LAYER 3: Drifting Ambient Vapor Puffs (volumetric mist texture) ---
        for (let i = 0; i < puffs.length; i++) {
          const p = puffs[i];
          p.life += dt;

          if (p.life >= p.maxLife) {
            puffs[i] = createPuff(false);
            continue;
          }

          const progress = p.life / p.maxLife;

          const heightProgress = Math.max(0, (baseY - p.y) / (height - 20));
          const roomDrift = Math.sin(t * 0.45 + heightProgress * 2.8) * (10 * Math.pow(progress, 0.75) * scaleFactor);
          const eddy = Math.sin(t * p.swayFreq + p.phase) * (p.swayAmp * Math.pow(progress, 0.6));

          p.x = p.startX + roomDrift + eddy;
          p.y += p.vy * dt;
          p.rotation += p.rotSpeed * dt;

          const r = p.baseRadius + (p.maxRadius - p.baseRadius) * Math.pow(progress, 0.65);

          let a = 0;
          if (progress < 0.15) {
            a = (progress / 0.15) * p.baseAlpha;
          } else if (progress < 0.40) {
            a = p.baseAlpha;
          } else {
            a = Math.max(0, (1 - (progress - 0.40) / 0.60) * p.baseAlpha);
          }

          if (a > 0.003 && p.y + r > 0 && p.y - r < height) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.scale(1.0, p.aspect);

            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
            grad.addColorStop(0, `rgba(255, 252, 246, ${(a * 0.85).toFixed(3)})`);
            grad.addColorStop(0.40, `rgba(246, 238, 224, ${(a * 0.45).toFixed(3)})`);
            grad.addColorStop(0.75, `rgba(238, 226, 206, ${(a * 0.12).toFixed(3)})`);
            grad.addColorStop(1, "rgba(235, 222, 195, 0)");

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [width, height, opacity, cupScale, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none block will-change-transform"
      style={{
        width,
        height,
      }}
      aria-hidden="true"
    />
  );
}
