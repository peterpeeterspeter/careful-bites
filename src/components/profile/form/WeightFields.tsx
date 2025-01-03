import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "./ProfileFormSchema";

interface WeightFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
}

export function WeightFields({ form }: WeightFieldsProps) {
  return (
    <>
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
    </>
  );
}