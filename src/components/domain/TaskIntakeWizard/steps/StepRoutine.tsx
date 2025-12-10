import { useFormContext } from "react-hook-form";
import type { WizardForm } from "../types";

export default function StepRoutine({ inputClass }: { inputClass: string }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<WizardForm>();
  const mobility = watch("mobilityIssues");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-(--text)">Daily Life & Limitations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <span className="text-sm text-(--text-secondary)">Can you train on weekends?</span>
          <div className="flex flex-col gap-1 mt-2 text-(--text)">
            <div className="flex gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="true"
                  {...register("canTrainOnWeekends", {
                    required: "⚠️ Select one, hero — even Goku needs to choose his training days!",
                  })}
                  className="cursor-pointer h-4 w-4 appearance-none rounded-full border-2 border-border checked:border-primary checked:bg-primary transition-all duration-300 ease-out scale-100 checked:scale-110"
                />
                <span className="select-none">Yes</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="false"
                  {...register("canTrainOnWeekends", {
                    required: "⚠️ Select one, hero — even Goku needs to choose his training days!",
                  })}
                  className="cursor-pointer h-4 w-4 appearance-none rounded-full border-2 border-border checked:border-primary checked:bg-primary transition-all duration-300 ease-out scale-100 checked:scale-110"
                />
                <span className="select-none">No</span>
              </label>
            </div>

            {errors.canTrainOnWeekends && (
              <span className="text-(--error) text-sm mt-1 animate-pulse">
                {errors.canTrainOnWeekends.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-(--text-secondary)">Mobility issues?</span>

          <label className="flex gap-2 mt-2 items-center cursor-pointer group">
            <input
              type="checkbox"
              {...register("mobilityIssues")}
              className="peer h-4 w-4 appearance-none rounded-lg border-2 border-border bg-(--bg) transition-all duration-200 checked:bg-primary checked:border-primary checked:shadow-[0_0_6px_var(--primary)] relative"
            />

            {/* Checkmark using ::after */}
            <span className="pointer-events-none absolute w-4 h-4 peer-checked:before:content-['✓'] peer-checked:before:absolute peer-checked:before:text-white peer-checked:before:text-xs peer-checked:before:font-bold peer-checked:before:left-[3px] peer-checked:before:-top-px"></span>

            <span className="text-sm text-(--text) transition-colors">
              I have mobility or joint limitations
            </span>
          </label>
        </div>
      </div>

      {mobility && (
        <textarea
          {...register("injuries")}
          placeholder="Describe limitations or injuries"
          rows={3}
          className={inputClass}
        />
      )}
    </div>
  );
}
