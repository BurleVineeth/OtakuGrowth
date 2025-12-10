/* eslint-disable react-hooks/purity */
import { useEffect, useMemo, useState } from "react";
import { randomColor } from "@/utils";

export function GrandCelebrate({
  message,
  duration = 3000, // default 3 sec
  onComplete,
}: {
  message: string;
  duration?: number;
  onComplete?: () => void;
}) {
  const [fadeOut, setFadeOut] = useState(false);

  // Generate confetti once
  const confetti = useMemo(() => {
    return [...Array(800)].map(() => ({
      left: Math.random() * 100,
      top: -(Math.random() * 10 + 5),
      delay: Math.random() * 1.5,
      size: Math.random() * 3 + 2,
      rotate: Math.random() * 360,
      duration: Math.random() * 2 + 3,
      drift: Math.random() * 30 - 15,
      color: randomColor(),
    }));
  }, []);

  // Handle fade-out + closing
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true); // begin fade animation
    }, duration);

    const removeTimer = setTimeout(() => {
      onComplete?.();
    }, duration + 800); // fade-out takes 800ms

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center pointer-events-none z-[9999] overflow-hidden 
        transition-opacity duration-700 
        ${fadeOut ? "opacity-0" : "opacity-100"}
      `}
    >
      {/* ✨ Glow Burst Behind Text */}
      <div className="absolute w-[300px] h-[300px] bg-pink-500/20 blur-3xl rounded-full animate-pulse-slow" />

      {/* 🎉 Confetti */}
      {confetti.map((c, i) => (
        <div
          key={i}
          className="absolute rounded-sm animate-confetti-enhanced"
          style={
            {
              width: `${c.size}px`,
              height: `${c.size * 1.4}px`,
              left: `${c.left}%`,
              top: `${c.top}vh`,
              backgroundColor: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              transform: `rotate(${c.rotate}deg)`,
              "--drift": `${c.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* 🌟 Message */}
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl animate-text-pop">
          {message}
        </h1>
      </div>
    </div>
  );
}
