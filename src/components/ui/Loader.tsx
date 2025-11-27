export default function Loader() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center 
      bg-black/60 backdrop-blur-sm"
    >
      <div className="relative flex items-center justify-center">
        {/* Aura Outer Ring */}
        <div
          className="absolute w-28 h-28 rounded-full border-4 border-[var(--primary)]
          animate-[spin_2s_linear_infinite] opacity-80 blur-[1px]"
        />

        {/* Pulsing Inner Ring */}
        <div
          className="absolute w-20 h-20 rounded-full border-2 border-[var(--primary)]
          animate-[ping_1.8s_ease-out_infinite] opacity-60"
        />

        {/* Energy Core */}
        <div
          className="w-14 h-14 rounded-full bg-[var(--primary)]
          animate-[pulse_1.2s_ease-in-out_infinite] shadow-[0_0_25px_var(--primary)]"
        />
      </div>
    </div>
  );
}
