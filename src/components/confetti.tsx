"use client";

import { useMemo } from "react";

const COLORS = ["#F5C518", "#E3001B", "#005BA8", "#0070CC", "#4CAF50", "#FFFFFF"];

// Generador con semilla: las posiciones son estables entre renders y no
// cambian de golpe cuando React vuelve a pintar el modal.
function seedRandom(seed: number) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Piece = {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  width: number;
  height: number;
  color: string;
  drift: number;
  radius: number;
};

export default function Confetti({ count = 55 }: { count?: number }) {
  const pieces = useMemo<Piece[]>(() => {
    const random = seedRandom(2026);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: random() * 100,
      top: random() * 85,
      delay: -(random() * 5),
      duration: 3.2 + random() * 2.8,
      width: 6 + random() * 7,
      height: 8 + random() * 8,
      color: COLORS[Math.floor(random() * COLORS.length)],
      drift: (random() - 0.5) * 160,
      radius: random() > 0.7 ? 999 : 1,
    }));
  }, [count]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            backgroundColor: piece.color,
            borderRadius: `${piece.radius}px`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            ["--drift" as string]: `${piece.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
