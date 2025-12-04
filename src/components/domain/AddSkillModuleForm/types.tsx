import { z } from "zod";

export enum SkillDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const ModuleSchema = (isEdit: boolean) =>
  z.object({
    name: z
      .string()
      .min(3, "⚡ Your skill name must be at least 3 characters!")
      .max(50, "⚡ Your skill name cannot exceed 50 characters!")
      .nonempty("⚡ A skill without a name is a power untamed!"),

    description: z
      .string()
      .min(10, "🖊️ Your description must be at least 10 characters!")
      .max(300, "🖊️ Keep your description under 300 characters!")
      .nonempty("🖊️ A skill without a description is incomplete!"),

    category: z
      .string()
      .nonempty("🔥 Every skill belongs to a discipline. Choose one!")
      .max(50, "🔥 Category must be 50 characters or less!"),

    difficulty: z.enum(
      [SkillDifficulty.BEGINNER, SkillDifficulty.INTERMEDIATE, SkillDifficulty.ADVANCED] as [
        SkillDifficulty,
        SkillDifficulty,
        SkillDifficulty,
      ],
      { error: "⚙️ Select a valid difficulty level!" }
    ),

    coverPhoto: isEdit
      ? z
          .any()
          .optional()
          .refine((file) => {
            if (!file || file.length === 0) return true;

            return file instanceof File || file[0] instanceof File;
          }, "📸 Invalid file format!")
      : z
          .any()
          .refine(
            (file) => file instanceof File || file?.[0] instanceof File,
            "📸 A cover photo is required when creating a new skill!"
          ),
  });

export const createModuleSchema = ModuleSchema(false);
export const editModuleSchema = ModuleSchema(true);

export type CreateModuleType = z.infer<typeof createModuleSchema>;
export type EditModuleType = z.infer<typeof editModuleSchema>;

export enum TaskType {
  ONE_TIME = "oneTime",
  DAILY = "daily",
  WEEKLY = "weekly",
}

export interface Task {
  _id: string;
  name: string;
  description?: string;
  type: TaskType;
  duration?: number;
  createdAt: string;
  skill: string;
  user: string;
}

export interface TaskFormValues {
  name: string;
  type: TaskType;
  duration?: number;
  description?: string;
}
