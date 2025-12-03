import { z } from "zod";

export enum SkillDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const ModuleSchema = z.object({
  name: z
    .string()
    .min(3, "⚡ Your skill name must be at least 3 characters!")
    .max(50, "⚡ Your skill name cannot exceed 50 characters!")
    .nonempty("⚡ A skill without a name is a power untamed!"),

  description: z
    .string()
    .min(10, "🖊️ Your description must be at least 10 characters!")
    .max(300, "🖊️ Keep your description under 300 characters!")
    .nonempty("🖊️ A skill without a description is incomplete! Describe its power…"),

  category: z
    .string()
    .nonempty("🔥 Every skill belongs to a discipline. Choose one!")
    .max(50, "🔥 Category must be 50 characters or less!"),

  difficulty: z.enum(SkillDifficulty, {
    error: "⚙️ Select a valid difficulty level!",
  }),

  coverPhoto: z
    .any()
    .refine(
      (file) => file instanceof File,
      "📸 Every skill needs a shining cover! Upload one to showcase it."
    ),
});

export type ModuleType = z.infer<typeof ModuleSchema>;
