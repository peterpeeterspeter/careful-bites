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

      try {
        // Fetch profile data
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast.error("Error loading profile data");
          return {};
        }

        // Fetch health condition data
        const { data: healthCondition, error: healthError } = await supabase
          .from("user_health_conditions")
          .select("condition, severity, notes")
          .eq("profile_id", user.id)
          .maybeSingle();

        if (healthError && !healthError.message.includes("No rows found")) {
          console.error("Error fetching health condition:", healthError);
          toast.error("Error loading health condition data");
          return {};
        }

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
      } catch (error) {
        console.error("Error loading form data:", error);
        toast.error("Error loading form data");
        return {};
      }
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    if (!user?.id) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    try {
      // First update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          age: values.age ? parseInt(values.age) : null,
          height_cm: values.height_cm ? parseInt(values.height_cm) : null,
          current_weight_kg: values.current_weight_kg ? parseFloat(values.current_weight_kg) : null,
          target_weight_kg: values.target_weight_kg ? parseFloat(values.target_weight_kg) : null,
          diabetes_type: values.diabetes_type,
          activity_level: values.activity_level,
          daily_calorie_target: values.daily_calorie_target ? parseInt(values.daily_calorie_target) : null,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Delete existing health condition if any
      const { error: deleteError } = await supabase
        .from("user_health_conditions")
        .delete()
        .eq("profile_id", user.id);

      if (deleteError && !deleteError.message.includes("No rows found")) {
        throw deleteError;
      }

      // Insert new health condition if not "none"
      if (values.health_condition !== "none") {
        const { error: insertError } = await supabase
          .from("user_health_conditions")
          .insert({
            profile_id: user.id,
            condition: values.health_condition,
            severity: values.condition_severity || null,
            notes: values.condition_notes || null,
          });

        if (insertError) throw insertError;
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile: " + (error as Error).message);
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