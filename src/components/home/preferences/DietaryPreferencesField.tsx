import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DietaryPreferencesFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function DietaryPreferencesField({ value, onChange }: DietaryPreferencesFieldProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Dietary Preferences</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Dietary Option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="classic">Classic</SelectItem>
          <SelectItem value="low-carb">Low Carb</SelectItem>
          <SelectItem value="keto">Keto</SelectItem>
          <SelectItem value="paleo">Paleo</SelectItem>
          <SelectItem value="vegetarian">Vegetarian</SelectItem>
          <SelectItem value="vegan">Vegan</SelectItem>
          <SelectItem value="pescatarian">Pescatarian</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}