import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";

type DiabetesType = Database["public"]["Enums"]["diabetes_type"];
type Gender = Database["public"]["Enums"]["gender"];
type ActivityLevel = Database["public"]["Enums"]["activity_level"];

interface FormData {
  diabetes_type: DiabetesType;
  diagnosis_date: string;
  last_hba1c: string;
  preferred_glucose_unit: string;
  insulin_therapy: boolean;
  insulin_pump_user: boolean;
  cgm_user: boolean;
  preferred_meal_times: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  age: string;
  height_cm: string;
  current_weight_kg: string;
  target_weight_kg: string;
  weight_goal_date: string;
  gender: Gender;
  activity_level: ActivityLevel;
  daily_calorie_target: string;
  budget_preference: string;
  family_size: string;
  insulin_regimen: string;
  glucose_monitor_device: string;
  medications_reminder: boolean;
  cooking_skill_level: string;
  available_cooking_time: string;
  meal_prep_preference: string;
  grocery_frequency: string;
  preferred_cuisines: string[];
  dietary_restrictions: string[];
  food_intolerances: { food: string; severity: string }[];
}

export const useProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    diabetes_type: "none",
    diagnosis_date: "",
    last_hba1c: "",
    preferred_glucose_unit: "mg/dL",
    insulin_therapy: false,
    insulin_pump_user: false,
    cgm_user: false,
    preferred_meal_times: {
      breakfast: "08:00",
      lunch: "13:00",
      dinner: "19:00",
    },
    age: "",
    height_cm: "",
    current_weight_kg: "",
    target_weight_kg: "",
    weight_goal_date: "",
    gender: "prefer_not_to_say",
    activity_level: "sedentary",
    daily_calorie_target: "",
    budget_preference: "",
    family_size: "",
    insulin_regimen: "",
    glucose_monitor_device: "",
    medications_reminder: false,
    cooking_skill_level: "",
    available_cooking_time: "",
    meal_prep_preference: "",
    grocery_frequency: "",
    preferred_cuisines: [],
    dietary_restrictions: [],
    food_intolerances: [],
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!user) throw new Error("No user found");
    setIsSubmitting(true);

    try {
      // Prepare the profile data, handling null values for dates
      const profileData = {
        diabetes_type: formData.diabetes_type as DiabetesType,
        diagnosis_date: formData.diagnosis_date || null,
        last_hba1c: formData.last_hba1c ? parseFloat(formData.last_hba1c) : null,
        preferred_glucose_unit: formData.preferred_glucose_unit,
        insulin_therapy: formData.insulin_therapy,
        insulin_pump_user: formData.insulin_pump_user,
        cgm_user: formData.cgm_user,
        preferred_meal_times: formData.preferred_meal_times,
        age: formData.age ? parseInt(formData.age) : null,
        height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
        current_weight_kg: formData.current_weight_kg ? parseFloat(formData.current_weight_kg) : null,
        target_weight_kg: formData.target_weight_kg ? parseFloat(formData.target_weight_kg) : null,
        weight_goal_date: formData.weight_goal_date || null,
        gender: formData.gender as Gender,
        activity_level: formData.activity_level as ActivityLevel,
        daily_calorie_target: formData.daily_calorie_target ? parseInt(formData.daily_calorie_target) : null,
        budget_preference: formData.budget_preference || null,
        family_size: formData.family_size ? parseInt(formData.family_size) : null,
        insulin_regimen: formData.insulin_regimen || null,
        glucose_monitor_device: formData.glucose_monitor_device || null,
        cooking_skill_level: formData.cooking_skill_level || null,
        available_cooking_time: formData.available_cooking_time || null,
        meal_prep_preference: formData.meal_prep_preference || null,
        grocery_frequency: formData.grocery_frequency || null,
        dietary_restrictions: formData.dietary_restrictions,
      };

      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Insert cuisine preferences
      if (formData.preferred_cuisines.length > 0) {
        const { error: cuisineError } = await supabase
          .from("cuisine_preferences")
          .upsert(
            formData.preferred_cuisines.map((cuisine: string) => ({
              profile_id: user.id,
              cuisine,
            }))
          );

        if (cuisineError) throw cuisineError;
      }

      // Insert food intolerances
      if (formData.food_intolerances.length > 0) {
        const { error: intoleranceError } = await supabase
          .from("food_intolerances")
          .upsert(
            formData.food_intolerances.map((intolerance) => ({
              profile_id: user.id,
              intolerance: intolerance.food,
              severity: intolerance.severity,
            }))
          );

        if (intoleranceError) throw intoleranceError;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
  };
};