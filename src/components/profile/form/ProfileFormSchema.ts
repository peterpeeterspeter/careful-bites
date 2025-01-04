import * as z from "zod";

export const diabetesTypes = ['type1', 'type2', 'gestational', 'prediabetes', 'none'] as const;
export const activityLevels = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'] as const;
export const healthConditions = ['none', 'kidney_disease', 'heart_disease', 'digestive_issues'] as const;

export const profileFormSchema = z.object({
  age: z.string().min(1, "Age is required").or(z.literal('')),
  height_cm: z.string().min(1, "Height is required").or(z.literal('')),
  current_weight_kg: z.string().min(1, "Current weight is required").or(z.literal('')),
  target_weight_kg: z.string().min(1, "Target weight is required").or(z.literal('')),
  diabetes_type: z.enum(diabetesTypes),
  activity_level: z.enum(activityLevels),
  daily_calorie_target: z.string().min(1, "Daily calorie target is required").or(z.literal('')),
  health_condition: z.enum(healthConditions),
  condition_severity: z.string().optional(),
  condition_notes: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;