import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const profileFormSchema = z.object({
  age: z.string().min(1, "Age is required"),
  height_cm: z.string().min(1, "Height is required"),
  current_weight_kg: z.string().min(1, "Current weight is required"),
  target_weight_kg: z.string().min(1, "Target weight is required"),
  diabetes_type: z.string().min(1, "Diabetes type is required"),
  activity_level: z.string().min(1, "Activity level is required"),
  daily_calorie_target: z.string().min(1, "Daily calorie target is required"),
});

export function ProfileForm() {
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof profileFormSchema>>({
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
        diabetes_type: profile?.diabetes_type || "",
        activity_level: profile?.activity_level || "",
        daily_calorie_target: profile?.daily_calorie_target?.toString() || "",
      };
    },
  });

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
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
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height_cm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="current_weight_kg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="target_weight_kg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="diabetes_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diabetes Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="type1">Type 1</SelectItem>
                    <SelectItem value="type2">Type 2</SelectItem>
                    <SelectItem value="gestational">Gestational</SelectItem>
                    <SelectItem value="prediabetes">Prediabetes</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activity_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="lightly_active">Lightly Active</SelectItem>
                    <SelectItem value="moderately_active">Moderately Active</SelectItem>
                    <SelectItem value="very_active">Very Active</SelectItem>
                    <SelectItem value="extra_active">Extra Active</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="daily_calorie_target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Calorie Target</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}