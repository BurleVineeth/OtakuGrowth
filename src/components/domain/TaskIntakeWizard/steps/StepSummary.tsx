import { useFormContext } from "react-hook-form";
import type { WizardForm } from "../types";

export default function StepSummary() {
  const { getValues } = useFormContext<WizardForm>();
  const values = getValues();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-(--text)">
        Summary — we'll generate your training arc
      </h2>

      <div className="space-y-2 p-4 bg-(--summary-bg) rounded border border-border text-(--text)">
        <div>
          <strong className="text-primary">Name:</strong> {values.name || "—"}
        </div>
        <div>
          <strong className="text-primary">Bio:</strong> {values.bio || "—"}
        </div>
        <div>
          <strong className="text-primary">Short goal:</strong> {values.shortTermGoal || "—"}
        </div>
        <div>
          <strong className="text-primary">Long goal:</strong> {values.longTermGoal || "—"}
        </div>
        <div className="capitalize">
          <strong className="text-primary">Intensity:</strong> {values.intensity || "—"}
        </div>
        <div>
          <strong className="text-primary">Time windows:</strong>
        </div>
        <ul className="pl-4 list-disc">
          {values.timeWindows?.length ? (
            values.timeWindows.map((t) => (
              <li key={t.id}>
                {t.label} — {t.from} to {t.to}
              </li>
            ))
          ) : (
            <li>None added</li>
          )}
        </ul>
      </div>

      <p className="text-sm text-(--text-secondary)">
        On finish we'll convert this into a personalized, adaptive schedule that can evolve as you
        progress.
      </p>
    </div>
  );
}
