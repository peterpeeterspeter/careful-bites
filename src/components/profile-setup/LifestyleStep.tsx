import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LifestyleStepProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}

export function LifestyleStep({
  formData,
  handleInputChange,
}: LifestyleStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cooking_skill_level">Cooking Skill Level</Label>
        <Select
          onValueChange={(value) => handleInputChange("cooking_skill_level", value)}
          value={formData.cooking_skill_level}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select skill level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="available_cooking_time">Available Cooking Time</Label>
        <Select
          onValueChange={(value) => handleInputChange("available_cooking_time", value)}
          value={formData.available_cooking_time}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select available time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quick">Quick (15-30 mins)</SelectItem>
            <SelectItem value="medium">Medium (30-60 mins)</SelectItem>
            <SelectItem value="extended">Extended (60+ mins)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="meal_prep_preference">Meal Prep Preference</Label>
        <Select
          onValueChange={(value) => handleInputChange("meal_prep_preference", value)}
          value={formData.meal_prep_preference}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select meal prep preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Cook Daily</SelectItem>
            <SelectItem value="batch">Batch Cooking</SelectItem>
            <SelectItem value="meal_prep">Meal Prep</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="grocery_frequency">Grocery Shopping Frequency</Label>
        <Select
          onValueChange={(value) => handleInputChange("grocery_frequency", value)}
          value={formData.grocery_frequency}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select shopping frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="biweekly">Bi-weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}