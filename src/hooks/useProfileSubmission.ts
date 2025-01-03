import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useProfileSubmission = (formData: any) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          diabetes_type: formData.diabetes_type,
          diagnosis_date: formData.diagnosis_date,
          last_hba1c: parseFloat(formData.last_hba1c),
          preferred_glucose_unit: formData.preferred_glucose_unit,
          insulin_therapy: formData.insulin_therapy,
          insulin_pump_user: formData.insulin_pump_user,
          cgm_user: formData.cgm_user,
          preferred_meal_times: formData.preferred_meal_times,
          age: parseInt(formData.age),
          height_cm: parseInt(formData.height_cm),
          current_weight_kg: parseFloat(formData.current_weight_kg),
          target_weight_kg: parseFloat(formData.target_weight_kg),
          weight_goal_date: formData.weight_goal_date,
          gender: formData.gender,
          activity_level: formData.activity_level,
          daily_calorie_target: parseInt(formData.daily_calorie_target),
          budget_preference: formData.budget_preference,
          family_size: parseInt(formData.family_size),
          insulin_regimen: formData.insulin_regimen,
          glucose_monitor_device: formData.glucose_monitor_device,
          cooking_skill_level: formData.cooking_skill_level,
          available_cooking_time: formData.available_cooking_time,
          meal_prep_preference: formData.meal_prep_preference,
          grocery_frequency: formData.grocery_frequency,
          dietary_restrictions: formData.dietary_restrictions,
        })
        .eq("id", user?.id);

      if (profileError) throw profileError;

      // Insert cuisine preferences
      if (formData.preferred_cuisines.length > 0) {
        const { error: cuisineError } = await supabase
          .from("cuisine_preferences")
          .upsert(
            formData.preferred_cuisines.map((cuisine: string) => ({
              profile_id: user?.id,
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
            formData.food_intolerances.map((intolerance: any) => ({
              profile_id: user?.id,
              intolerance: intolerance.food,
              severity: intolerance.severity,
            }))
          );

        if (intoleranceError) throw intoleranceError;
      }

      toast.success("Profile setup completed!");
      navigate("/");
    } catch (error) {
      toast.error("Error updating profile: " + (error as Error).message);
    }
  };

  return {
    handleSubmit,
  };
};