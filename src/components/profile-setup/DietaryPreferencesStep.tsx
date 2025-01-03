import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DietaryPreferencesStepProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}

export function DietaryPreferencesStep({
  formData,
  handleInputChange,
}: DietaryPreferencesStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="budget_preference">Budget Preference</Label>
        <Select
          onValueChange={(value) => handleInputChange("budget_preference", value)}
          value={formData.budget_preference}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">Budget-friendly</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="family_size">Family Size</Label>
        <Input
          id="family_size"
          type="number"
          value={formData.family_size}
          onChange={(e) => handleInputChange("family_size", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferred_meal_times">Preferred Meal Times</Label>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="breakfast_time">Breakfast</Label>
            <Input
              id="breakfast_time"
              type="time"
              value={formData.preferred_meal_times?.breakfast || "08:00"}
              onChange={(e) =>
                handleInputChange("preferred_meal_times.breakfast", e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor="lunch_time">Lunch</Label>
            <Input
              id="lunch_time"
              type="time"
              value={formData.preferred_meal_times?.lunch || "13:00"}
              onChange={(e) =>
                handleInputChange("preferred_meal_times.lunch", e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor="dinner_time">Dinner</Label>
            <Input
              id="dinner_time"
              type="time"
              value={formData.preferred_meal_times?.dinner || "19:00"}
              onChange={(e) =>
                handleInputChange("preferred_meal_times.dinner", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}