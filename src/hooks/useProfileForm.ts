import { useState } from "react";

export const useProfileForm = () => {
  const [formData, setFormData] = useState({
    diabetes_type: "",
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
    gender: "",
    activity_level: "",
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

  return {
    formData,
    handleInputChange,
  };
};