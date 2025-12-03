import { useState } from "react";

export function useWizard(totalSteps: number) {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => Math.min(totalSteps, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const goto = (s: number) => setStep(() => Math.max(1, Math.min(totalSteps, s)));
  return { step, next, back, goto };
}
