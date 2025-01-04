import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { profileFormSchema, type ProfileFormValues } from "./form/ProfileFormSchema";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { WeightFields } from "./form/WeightFields";
import { HealthFields } from "./form/HealthFields";
import { HealthConditionsFields } from "./form/HealthConditionsFields";

export function ProfileForm() {
  const { user } = useAuth();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: async () => {
      if (!user?.id) {
        toast.error("You must be logged in to view your profile");
        return {};
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const { data: healthCondition } = await supabase
        .from("user_health_conditions")
        .select("condition, severity, notes")
        .eq("profile_id", user.id)
        .maybeSingle();

      return {
        age: profile?.age?.toString() || "",
        height_cm: profile?.height_cm?.toString() || "",
        current_weight_kg: profile?.current_weight_kg?.toString() || "",
        target_weight_kg: profile?.target_weight_kg?.toString() || "",
        diabetes_type: profile?.diabetes_type || "none",
        activity_level: profile?.activity_level || "sedentary",
        daily_calorie_target: profile?.daily_calorie_target?.toString() || "",
        health_condition: healthCondition?.condition || "none",
        condition_severity: healthCondition?.severity || "",
        condition_notes: healthCondition?.notes || "",
      };
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    if (!user?.id) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    try {
      // Update profile first
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          age: parseInt(values.age),
          height_cm: parseInt(values.height_cm),
          current_weight_kg: parseFloat(values.current_weight_kg),
          target_weight_kg: parseFloat(values.target_weight_kg),
          diabetes_type: values.diabetes_type,
          activity_level: values.activity_level,
          daily_calorie_target: parseInt(values.daily_calorie_target),
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Handle health condition
      if (values.health_condition !== "none") {
        // First, check if a health condition exists
        const { data: existingCondition } = await supabase
          .from("user_health_conditions")
          .select("id")
          .eq("profile_id", user.id)
          .maybeSingle();

        if (existingCondition) {
          // Update existing condition
          const { error: updateError } = await supabase
            .from("user_health_conditions")
            .update({
              condition: values.health_condition,
              severity: values.condition_severity,
              notes: values.condition_notes,
            })
            .eq("profile_id", user.id);

          if (updateError) throw updateError;
        } else {
          // Insert new condition with explicit profile_id
          const { error: insertError } = await supabase
            .from("user_health_conditions")
            .insert({
              profile_id: user.id,
              condition: values.health_condition,
              severity: values.condition_severity,
              notes: values.condition_notes,
            });

          if (insertError) throw insertError;
        }
      } else {
        // If health condition is none, delete any existing condition
        const { error: deleteError } = await supabase
          .from("user_health_conditions")
          .delete()
          .eq("profile_id", user.id);

        if (deleteError) throw deleteError;
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <BasicInfoFields form={form} />
          <WeightFields form={form} />
          <HealthFields form={form} />
          <HealthConditionsFields form={form} />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}