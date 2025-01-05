import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { profileFormSchema, type ProfileFormValues } from "./form/ProfileFormSchema";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { HealthFields } from "./form/HealthFields";
import { WeightFields } from "./form/WeightFields";
import { HealthConditionsFields } from "./form/HealthConditionsFields";

export function ProfileForm() {
  const { user } = useAuth();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      age: "",
      height_cm: "",
      current_weight_kg: "",
      target_weight_kg: "",
      diabetes_type: "none",
      activity_level: "sedentary",
      daily_calorie_target: "",
      health_condition: "none",
      condition_severity: "",
      condition_notes: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // Convert string values to numbers where needed
      const formattedData = {
        ...data,
        age: data.age ? parseInt(data.age) : null,
        height_cm: data.height_cm ? parseInt(data.height_cm) : null,
        current_weight_kg: data.current_weight_kg ? parseFloat(data.current_weight_kg) : null,
        target_weight_kg: data.target_weight_kg ? parseFloat(data.target_weight_kg) : null,
        daily_calorie_target: data.daily_calorie_target ? parseInt(data.daily_calorie_target) : null,
      };

      const { error } = await supabase
        .from('profiles')
        .update(formattedData)
        .eq('id', user?.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <BasicInfoFields form={form} />
        <HealthFields form={form} />
        <WeightFields form={form} />
        <HealthConditionsFields form={form} />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}