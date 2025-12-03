import { useFormContext, useFieldArray } from "react-hook-form";
import type { WizardForm } from "../types";

export default function StepTimeWindows() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<WizardForm>();

  const { fields, append, remove } = useFieldArray({ control, name: "timeWindows" });

  const addNewWindow = () =>
    append({
      id: crypto.randomUUID(),
      label: "",
      from: "18:00",
      to: "19:00",
    });

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-semibold text-[var(--text)]">🕒 When can you do work?</h2>
      <p className="text-sm text-[var(--text-secondary)]">
        Add dedicated time windows we can schedule tasks into.
      </p>

      <div className="flex flex-col gap-4">
        {fields.map((f, i) => (
          <div
            key={f.id}
            className="flex flex-col md:flex-row gap-4 p-4 border border-[var(--border)] rounded-lg bg-[var(--bg)]"
          >
            {/* Label */}
            <div className="flex-1 flex flex-col">
              <input
                {...register(`timeWindows.${i}.label` as const, {
                  required: "⚔️ Every hero needs a label for their training slot!",
                  minLength: { value: 3, message: "✨ At least 3 characters, warrior!" },
                })}
                placeholder="Label (e.g., Evening)"
                className="p-2 rounded-lg border border-[var(--border)] bg-[var(--time-input-bg)] text-[var(--text)] w-full h-12 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
              />
              {errors.timeWindows?.[i]?.label && (
                <span className="text-[var(--error)] text-xs mt-1">
                  {errors.timeWindows[i].label?.message}
                </span>
              )}
            </div>

            {/* Time Inputs */}
            <div className="flex-1 flex flex-col md:flex-row gap-2">
              {/* From */}
              <div className="relative flex-1 flex flex-col">
                <div className="h-12 relative">
                  <input
                    type="time"
                    {...register(`timeWindows.${i}.from` as const, {
                      required: "⏰ Set the start time of your quest!",
                    })}
                    className="p-2 rounded-lg border border-[var(--border)] bg-[var(--time-input-bg)] text-[var(--text)] w-full appearance-none h-12 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: "var(--primary)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2M12 4a8 8 0 100 16 8 8 0 000-16z"
                    />
                  </svg>
                </div>
                {errors.timeWindows?.[i]?.from && (
                  <span className="text-[var(--error)] text-xs mt-1">
                    {errors.timeWindows[i].from?.message}
                  </span>
                )}
              </div>

              <div className="hidden relative flex-1 flex-col md:flex">
                <div className="h-12 relative flex items-center">
                  <span className="text-sm text-[var(--text)]">—</span>
                </div>
              </div>

              {/* To */}
              <div className="relative flex-1 flex flex-col">
                <div className="h-12 relative">
                  <input
                    type="time"
                    {...register(`timeWindows.${i}.to` as const, {
                      required: "⏰ Set the end time of your quest!",
                    })}
                    className="p-2 rounded-lg border border-[var(--border)] bg-[var(--time-input-bg)] text-[var(--text)] w-full appearance-none h-12 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: "var(--primary)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2M12 4a8 8 0 100 16 8 8 0 000-16z"
                    />
                  </svg>
                </div>
                {errors.timeWindows?.[i]?.to && (
                  <span className="text-[var(--error)] text-xs mt-1">
                    {errors.timeWindows[i].to?.message}
                  </span>
                )}
              </div>
            </div>

            {/* Remove */}
            <div className="flex flex-col gap-2 items-start md:items-end mt-2 md:mt-0">
              <button
                type="button"
                onClick={() => remove(i)}
                className="px-3 py-1 rounded bg-[var(--danger)] text-[var(--text)] hover:bg-[var(--danger-hover)] transition h-12 cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Add button */}
        <button
          type="button"
          onClick={addNewWindow}
          className="flex items-center gap-2 px-4 py-2 mt-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition w-full md:w-auto cursor-pointer justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Time Window
        </button>

        {/* Empty state */}
        {fields.length === 0 && (
          <div className="text-sm text-[var(--text-secondary)] mt-2 animate-pulse">
            ⚠️ No time windows yet — adding them gives better schedules!
          </div>
        )}
      </div>
    </div>
  );
}
