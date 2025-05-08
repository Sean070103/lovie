'use client';

import React, { useEffect, useRef } from 'react';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const StarsGalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw galaxy gradient
    const gradient = ctx.createRadialGradient(
      width * 0.7,
      height * 0.3,
      width * 0.05,
      width * 0.7,
      height * 0.3,
      width * 0.4
    );
    gradient.addColorStop(0, 'rgba(180, 130, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(60, 30, 120, 0.4)');
    gradient.addColorStop(1, 'rgba(10, 10, 30, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw stars
    for (let i = 0; i < 180; i++) {
      const x = random(0, width);
      const y = random(0, height);
      const r = random(0.3, 1.5);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${random(0.6, 1)})`;
      ctx.shadowColor = '#fff8';
      ctx.shadowBlur = random(2, 8);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    // Draw some larger glowing stars
    for (let i = 0; i < 8; i++) {
      const x = random(0, width);
      const y = random(0, height);
      const r = random(2, 4);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255,255,200,0.9)';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
      }}
    />
  );
};

export default StarsGalaxyBackground;
