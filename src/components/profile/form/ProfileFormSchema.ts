import * as z from "zod";

// Define the enum types to match Supabase schema
export const diabetesTypes = ['type1', 'type2', 'gestational', 'prediabetes', 'none'] as const;
export const activityLevels = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'] as const;

export const profileFormSchema = z.object({
  age: z.string().min(1, "Age is required"),
  height_cm: z.string().min(1, "Height is required"),
  current_weight_kg: z.string().min(1, "Current weight is required"),
  target_weight_kg: z.string().min(1, "Target weight is required"),
  diabetes_type: z.enum(diabetesTypes),
  activity_level: z.enum(activityLevels),
  daily_calorie_target: z.string().min(1, "Daily calorie target is required"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;