import { randomColor } from "@/utils";

/* eslint-disable react-hooks/purity */
export function SimpleCelebrate() {
  return (
    <div className="fixed inset-0 pointer-events-none z-9999">
      {[...Array(200)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 10 + 5}vh`,
            animationDelay: `${Math.random()}s`,
            backgroundColor: randomColor(),
          }}
        />
      ))}
    </div>
  );
}
