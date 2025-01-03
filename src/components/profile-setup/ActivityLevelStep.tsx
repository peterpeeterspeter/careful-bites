import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActivityLevelStepProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}

export function ActivityLevelStep({
  formData,
  handleInputChange,
}: ActivityLevelStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="activity_level">Activity Level</Label>
        <Select
          onValueChange={(value) => handleInputChange("activity_level", value)}
          value={formData.activity_level}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select activity level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sedentary">Sedentary</SelectItem>
            <SelectItem value="lightly_active">Lightly Active</SelectItem>
            <SelectItem value="moderately_active">Moderately Active</SelectItem>
            <SelectItem value="very_active">Very Active</SelectItem>
            <SelectItem value="extra_active">Extra Active</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="daily_calorie_target">Daily Calorie Target (kcal)</Label>
        <Input
          id="daily_calorie_target"
          type="number"
          value={formData.daily_calorie_target}
          onChange={(e) =>
            handleInputChange("daily_calorie_target", e.target.value)
          }
        />
      </div>
    </div>
  );
}