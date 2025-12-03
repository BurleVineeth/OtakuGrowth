import { useFormContext } from "react-hook-form";
import type { WizardForm } from "../types";

export default function StepGoals({ inputClass }: { inputClass: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<WizardForm>();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[var(--text)]">What do you want to become?</h2>

      <input
        {...register("shortTermGoal", {
          required: "🗡️ Hey, warrior! You must declare your short-term quest!",
          minLength: {
            value: 5,
            message: "⚔️ At least 5 characters, hero! Don’t underestimate your journey!",
          },
          maxLength: {
            value: 150,
            message: "🛡️ Keep it concise, hero! No epic novels here!",
          },
          setValueAs: (v: string) => v.trim(),
        })}
        placeholder="Short-term goal (4–12 weeks)"
        className={`${inputClass} h-12`}
      />
      {errors.shortTermGoal && (
        <p className="text-xs text-[var(--error)]">{errors.shortTermGoal.message}</p>
      )}

      <textarea
        {...register("longTermGoal", {
          required: "🌟 Brave soul! Declare your long-term mission!",
          minLength: {
            value: 10,
            message: "⚔️ At least 10 characters, hero! Every mission needs detail!",
          },
          maxLength: {
            value: 500,
            message: "🛡️ Keep it focused, warrior! Even legends have limits.",
          },
          setValueAs: (v: string) => v.trim(),
        })}
        placeholder="Long-term mission (6+ months)"
        rows={4}
        className={inputClass}
      />
      {errors.longTermGoal && (
        <p className="text-xs text-[var(--error)]">{errors.longTermGoal.message}</p>
      )}

      <p className="text-sm text-[var(--text-secondary)]">
        Tip: Make short-term measurable (e.g., "read 20 pages/day", "finish 12 workouts").
      </p>
    </div>
  );
}
