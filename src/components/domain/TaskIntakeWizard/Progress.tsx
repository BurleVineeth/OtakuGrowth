export default function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-(--text-secondary)">
          Step {step} of {total}
        </p>
        <p className="text-sm font-medium text-(--text)">{pct}%</p>
      </div>

      <div className="w-full h-2 bg-(--progress-bg) rounded-full">
        <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
