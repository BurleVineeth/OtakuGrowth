import { FormProvider, useForm } from "react-hook-form";
import { LocalStorageKeys } from "@/constants/localStorageKeys.tsx";
import { presentToast, TOAST_TYPES } from "@/redux/features/ToastSlice.tsx";
import React, { useEffect } from "react";
import type { AppState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useWizard } from "./hooks/useWizard";
import Progress from "./Progress";
import StepBasics from "./steps/StepBasics";
import StepGoals from "./steps/StepGoals";
import StepIntensity from "./steps/StepIntensity";
import StepRoutine from "./steps/StepRoutine";
import StepSummary from "./steps/StepSummary";
import StepTimeWindows from "./steps/StepTimeWindows";
import type { WizardForm } from "./types";

const inputClass =
  "p-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none";

export default React.memo(function TaskIntakeWizard() {
  const total = 6;
  const { step, next, back, goto } = useWizard(total);
  const userName = useSelector(({ user }: AppState) => user?.name || "");
  const dispatch = useDispatch();

  // Compute initial values including saved data
  const initialValues: WizardForm = (() => {
    const savedData = localStorage.getItem(LocalStorageKeys.WIZARD_DATA);
    const parsedSavedData: Partial<WizardForm> = savedData ? JSON.parse(savedData) : {};

    return {
      name: parsedSavedData.name || userName || "",
      age: parsedSavedData.age ?? null,
      bio: parsedSavedData.bio ?? "",
      sleepHours: parsedSavedData.sleepHours ?? null,
      energyPattern: parsedSavedData.energyPattern ?? "",
      canTrainOnWeekends: parsedSavedData.canTrainOnWeekends ?? undefined,
      mobilityIssues: parsedSavedData.mobilityIssues ?? false,
      injuries: parsedSavedData.injuries ?? "",
      shortTermGoal: parsedSavedData.shortTermGoal ?? "",
      longTermGoal: parsedSavedData.longTermGoal ?? "",
      intensity: parsedSavedData.intensity ?? "",
      timeWindows: parsedSavedData.timeWindows ?? [
        { id: "tw-1", label: "Morning (before work)", from: "06:00", to: "08:00" },
      ],
    };
  })();

  const methods = useForm<WizardForm>({
    defaultValues: initialValues,
    mode: "onChange",
  });

  const canNext = methods.formState.isValid;

  // Optional: keep userName reactive
  useEffect(() => {
    if (userName && userName !== methods.getValues("name")) {
      methods.setValue("name", userName);
    }
  }, [methods, userName]);

  const onSubmit = (data: WizardForm) => {
    localStorage.setItem(LocalStorageKeys.WIZARD_DATA, JSON.stringify(data));
    dispatch(
      presentToast({ message: "Wizard completed successfully!", type: TOAST_TYPES.SUCCESS })
    );
    goto(1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <div
        className="p-6 rounded-2xl bg-[var(--bg-secondary)] shadow-primary border border-[var(--primary)]/20 backdrop-blur-lg"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <h1 className="text-3xl font-bold mb-1 text-[var(--primary)]">Task Creation Wizard</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          We convert your life into an evolving training schedule — who are you now, who will you
          become?
        </p>
      </div>

      <div
        className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--primary)]/20 shadow-xl"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <Progress step={step} total={total} />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-6"
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div>
              {step === 1 && <StepBasics inputClass={inputClass} />}
              {step === 2 && <StepRoutine inputClass={inputClass} />}
              {step === 3 && <StepGoals inputClass={inputClass} />}
              {step === 4 && <StepIntensity />}
              {step === 5 && <StepTimeWindows />}
              {step === 6 && <StepSummary />}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="px-5 py-2 rounded-lg border border-[var(--border)] text-[var(--text)] bg-[var(--bg-secondary)] cursor-pointer"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < total && (
                  <button
                    type="button"
                    onClick={() => next()}
                    disabled={!canNext}
                    className={`px-5 py-2 rounded-lg text-[var(--text)] ${
                      canNext
                        ? "bg-[var(--primary)] cursor-pointer hover:bg-[var(--primary-dark)]"
                        : "bg-[var(--disabled)] text-[var(--disabled-text)] cursor-not-allowed"
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClickCapture={() => {}}
                  >
                    Next
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {step < total ? (
                  <></>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg text-[var(--text)] bg-[var(--primary)] w-full cursor-pointer hover:bg-[var(--primary-dark)]"
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
});
