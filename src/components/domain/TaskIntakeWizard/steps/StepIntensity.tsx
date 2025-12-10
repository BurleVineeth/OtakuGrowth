import { useFormContext } from "react-hook-form";
import type { Intensity, WizardForm } from "../types";

const opts: { label: string; value: Intensity; desc: string }[] = [
  { label: "Slow", value: "slow", desc: "Gentle, steady progress, low daily time." },
  { label: "Balanced", value: "balanced", desc: "Sustainable daily work, consistent progress." },
  {
    label: "Aggressive",
    value: "aggressive",
    desc: "Big focus blocks — training arc, higher intensity.",
  },
];

export default function StepIntensity() {
  const { register, watch } = useFormContext<WizardForm>();
  const current = watch("intensity");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-(--text)">Choose your training arc</h2>
      <p className="text-sm text-(--text-secondary)">
        How fast and intense do you want progress to be?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        {opts.map((o) => (
          <label
            key={o.value}
            className={`p-3 rounded-lg border cursor-pointer flex flex-col gap-2 ${
              current === o.value
                ? "border-primary bg-(--primary)/10"
                : "border-(--option-border) bg-(--bg-secondary)"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-(--text)">{o.label}</div>
              <input
                type="radio"
                value={o.value}
                {...register("intensity", {
                  required: "🔥 Hero! You must declare your training intensity!",
                })}
                checked={current === o.value}
                className="cursor-pointer h-2 w-2 appearance-none rounded-full border-2 border-border checked:border-primary checked:bg-primary transition-all duration-300 ease-out scale-100 checked:scale-110"
                readOnly
              />
            </div>
            <div className="text-xs text-(--text-secondary)">{o.desc}</div>
          </label>
        ))}
      </div>
    </div>
  );
}
