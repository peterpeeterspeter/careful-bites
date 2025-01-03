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

export function ProfileForm() {
  const { user } = useAuth();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      return {
        age: profile?.age?.toString() || "",
        height_cm: profile?.height_cm?.toString() || "",
        current_weight_kg: profile?.current_weight_kg?.toString() || "",
        target_weight_kg: profile?.target_weight_kg?.toString() || "",
        diabetes_type: profile?.diabetes_type || "none",
        activity_level: profile?.activity_level || "sedentary",
        daily_calorie_target: profile?.daily_calorie_target?.toString() || "",
      };
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    try {
      const { error } = await supabase
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
        .eq("id", user?.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error) {
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
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}