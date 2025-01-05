import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { profileFormSchema, type ProfileFormValues } from "./form/ProfileFormSchema";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { HealthFields } from "./form/HealthFields";
import { WeightFields } from "./form/WeightFields";
import { HealthConditionsFields } from "./form/HealthConditionsFields";

export function ProfileForm() {
  const { user } = useAuth();

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ ...data, id: user?.id });

      if (error) throw error;

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(profileFormSchema)}
      className="space-y-4"
    >
      <BasicInfoFields />
      <HealthFields />
      <WeightFields />
      <HealthConditionsFields />
      <Button type="submit">Save Changes</Button>
    </Form>
  );
}
