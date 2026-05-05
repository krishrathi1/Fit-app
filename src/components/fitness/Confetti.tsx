'use client';

import { useEffect, useState, useMemo } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface ConfettiProps {
  show: boolean;
}

const COLORS = ['#10b981', '#06b6d4', '#f97316', '#8b5cf6', '#f59e0b', '#f43f5e'];
const PIECE_COUNT = 30;

export function Confetti({ show }: ConfettiProps) {
  const [visible, setVisible] = useState(false);

  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: PIECE_COUNT }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 1.5,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 720 - 360,
    }));
  }, []);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.size > 10 ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            // Custom end rotation via CSS custom prop read by keyframes
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
