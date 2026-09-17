"use client";

import { useEffect, useRef } from "react";

type SteamEffectProps = {
  width?: number;
  height?: number;
  opacity?: number;
  cupScale?: number;
  reducedMotion?: boolean;
};

type Mist = {
  spawnX: number;
  x: number;
  y: number;
  life: number;
  maxLife: number;
  rise: number;
  grow: number;
  wobble: number;
  wobbleSpeed: number;
  phase: number;
  alpha: number;
  stretch: number;
};

export function SteamEffect({
  width = 160,
  height = 240,
  opacity = 0.55,
  cupScale = 1,
  reducedMotion = false,
}: SteamEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = width / 2;
    const base = height - 6;
    const s = Math.min(Math.max(cupScale, 0.75), 1.4);

    if (reducedMotion) {
      const g = ctx.createRadialGradient(cx, base - 28, 0, cx, base - 28, 36);
      g.addColorStop(0, "rgba(255,250,242,0.07)");
      g.addColorStop(1, "rgba(255,250,242,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, base - 28, 22, 40, 0, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    const count = 48;
    const mist: Mist[] = [];

    const spawn = (seed = false): Mist => {
      const maxLife = 2.8 + Math.random() * 2.2;
      const spawnX = cx + (Math.random() - 0.5) * 36 * s;
      return {
        spawnX,
        x: spawnX,
        y: base - Math.random() * 6,
        life: seed ? Math.random() * maxLife : 0,
        maxLife,
        rise: 22 + Math.random() * 18,
        grow: (14 + Math.random() * 18) * s,
        wobble: (6 + Math.random() * 10) * s,
        wobbleSpeed: 0.55 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        alpha: (0.035 + Math.random() * 0.04) * opacity,
        stretch: 1.15 + Math.random() * 0.45,
      };
    };

    for (let i = 0; i < count; i++) mist.push(spawn(true));

    let frame = 0;
    let last = performance.now();
    let visible = true;

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;

      if (visible) {
        ctx.clearRect(0, 0, width, height);

        // Soft heat shimmer just above foam
        const shimmer = 0.04 + Math.sin(t * 1.2) * 0.01;
        const heat = ctx.createRadialGradient(cx, base, 0, cx, base, 28 * s);
        heat.addColorStop(0, `rgba(255,250,242,${(shimmer * opacity).toFixed(3)})`);
        heat.addColorStop(1, "rgba(255,250,242,0)");
        ctx.save();
        ctx.scale(1, 0.28);
        ctx.fillStyle = heat;
        ctx.beginPath();
        ctx.arc(cx, base / 0.28, 28 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        for (let i = 0; i < mist.length; i++) {
          const m = mist[i];
          m.life += dt;
          if (m.life >= m.maxLife) {
            mist[i] = spawn(false);
            continue;
          }

          const p = m.life / m.maxLife;
          const ease = Math.pow(p, 0.85);
          m.y = base - m.rise * ease * (height / 90);
          m.x =
            m.spawnX +
            Math.sin(t * m.wobbleSpeed + m.phase) * m.wobble * ease +
            Math.sin(t * 0.35 + m.phase) * 4 * ease;

          const r = 5 * s + m.grow * Math.pow(p, 0.55);
          let a = 0;
          if (p < 0.18) a = (p / 0.18) * m.alpha;
          else if (p < 0.5) a = m.alpha;
          else a = m.alpha * (1 - (p - 0.5) / 0.5);

          if (a < 0.002) continue;

          ctx.save();
          ctx.translate(m.x, m.y);
          ctx.scale(1, m.stretch);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
          g.addColorStop(0, `rgba(255,252,246,${(a * 0.9).toFixed(3)})`);
          g.addColorStop(0.45, `rgba(245,238,225,${(a * 0.35).toFixed(3)})`);
          g.addColorStop(1, "rgba(240,230,210,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [width, height, opacity, cupScale, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none block"
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
