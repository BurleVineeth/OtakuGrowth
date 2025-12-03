import { useFormContext } from "react-hook-form";
import type { WizardForm } from "../types";
import EnergyPatternField from "./EnergyPatternField";

export default function StepBasics({ inputClass }: { inputClass: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<WizardForm>();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-[var(--text)]">Who are you now?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className={`${inputClass} !bg-[var(--disabled)] !text-[var(--disabled-text)] cursor-not-allowed h-12`}
            disabled
          />
          {errors.name && (
            <span className="mt-1 text-xs text-[var(--error)]">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="number"
            {...register("age", {
              required: "State your age, warrior — every journey begins with truth ⚔️",
              min: {
                value: 5,
                message:
                  "Your flame is still too young to endure this path — return when it burns stronger 🔥",
              },
              max: {
                value: 100,
                message: "A century of experience? Even legends must stay within mortal limits ⚡",
              },
            })}
            placeholder="Age"
            className={`${inputClass} h-12`}
          />
          {errors.age && (
            <span className="mt-1 text-xs text-[var(--error)]">{errors.age.message}</span>
          )}
        </div>

        <EnergyPatternField inputClass={inputClass} />
      </div>

      <div className="flex flex-col">
        <textarea
          {...register("bio", {
            required:
              "A true warrior never walks into a new world without a story — speak your truth ⚔️",
            minLength: {
              value: 20,
              message:
                "These words are too fragile… Forge something at least 20 characters strong — let your ambition roar 🔥",
            },
          })}
          placeholder="Short bio — habits, motivation, what shapes you"
          rows={4}
          className={inputClass}
        />
        {errors.bio && (
          <span className="mt-1 text-xs text-[var(--error)]">{errors.bio.message}</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <input
            type="number"
            {...register("sleepHours", {
              required: "You can’t rise without rest — enter your sleep hours 🔥",
              min: {
                value: 1,
                message: "To stand tall tomorrow, you need at least 1 hour today ⚡",
              },
              max: { value: 20, message: "Too much rest dulls the blade — stay below 20 ⚔️" },
            })}
            placeholder="Typical sleep hours"
            className={`${inputClass} h-12`}
          />
          {errors.sleepHours && (
            <span className="mt-1 text-xs text-[var(--error)]">{errors.sleepHours.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}
