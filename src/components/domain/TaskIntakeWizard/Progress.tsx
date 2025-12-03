export default function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-[var(--text-secondary)]">
          Step {step} of {total}
        </p>
        <p className="text-sm font-medium text-[var(--text)]">{pct}%</p>
      </div>

      <div className="w-full h-2 bg-[var(--progress-bg)] rounded-full">
        <div
          className="h-2 rounded-full bg-[var(--primary)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
