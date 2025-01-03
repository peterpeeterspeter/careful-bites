import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WeightGoalsStepProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
}

export function WeightGoalsStep({
  formData,
  handleInputChange,
}: WeightGoalsStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="current_weight_kg">Current Weight (kg)</Label>
        <Input
          id="current_weight_kg"
          type="number"
          step="0.1"
          value={formData.current_weight_kg}
          onChange={(e) => handleInputChange("current_weight_kg", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="target_weight_kg">Target Weight (kg)</Label>
        <Input
          id="target_weight_kg"
          type="number"
          step="0.1"
          value={formData.target_weight_kg}
          onChange={(e) => handleInputChange("target_weight_kg", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="weight_goal_date">Target Date</Label>
        <Input
          id="weight_goal_date"
          type="date"
          value={formData.weight_goal_date}
          onChange={(e) => handleInputChange("weight_goal_date", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          onValueChange={(value) => handleInputChange("gender", value)}
          value={formData.gender}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}