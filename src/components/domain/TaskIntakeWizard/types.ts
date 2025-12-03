export type Intensity = "slow" | "balanced" | "aggressive";

export interface TimeWindow {
  id: string;
  label: string; // e.g. "Weekdays - Morning"
  from: string; // "07:00"
  to: string; // "09:00"
}

export interface WizardForm {
  // Step 1 - Who are you
  name: string;
  age?: number | null;
  bio: string;
  sleepHours?: number | null;
  energyPattern?: "morning" | "afternoon" | "evening" | "variable" | "";

  // Step 2 - Routine & Limitations
  canTrainOnWeekends?: boolean;
  mobilityIssues?: boolean;
  injuries?: string;

  // Step 3 - Goals
  shortTermGoal: string;
  longTermGoal: string;

  // Step 4 - Intensity
  intensity: Intensity | "";

  // Step 5 - Time windows
  timeWindows: TimeWindow[];
}
