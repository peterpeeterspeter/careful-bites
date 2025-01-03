export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  diabetes_type: 'type1' | 'type2' | 'gestational' | 'prediabetes' | 'none' | null;
  age: number | null;
  height_cm: number | null;
  current_weight_kg: number | null;
  target_weight_kg: number | null;
  weight_goal_date: string | null;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
  activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active' | null;
  daily_calorie_target: number | null;
  bmi: number | null;
  budget_preference: string | null;
  family_size: number | null;
  diagnosis_date: string | null;
  last_hba1c: number | null;
  preferred_glucose_unit: 'mg/dL' | 'mmol/L' | null;
  insulin_therapy: boolean | null;
  insulin_pump_user: boolean | null;
  cgm_user: boolean | null;
  preferred_meal_times: {
    breakfast: string;
    lunch: string;
    dinner: string;
  } | null;
  dietary_restrictions: string[] | null;
  allergies: string[] | null;
}