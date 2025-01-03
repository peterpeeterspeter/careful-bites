import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FoodIntolerancesStepProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

export function FoodIntolerancesStep({
  formData,
  handleInputChange,
}: FoodIntolerancesStepProps) {
  const addIntolerance = () => {
    const currentIntolerances = formData.food_intolerances || [];
    handleInputChange("food_intolerances", [
      ...currentIntolerances,
      { food: "", severity: "mild" },
    ]);
  };

  const removeIntolerance = (index: number) => {
    const currentIntolerances = formData.food_intolerances || [];
    handleInputChange(
      "food_intolerances",
      currentIntolerances.filter((_: any, i: number) => i !== index)
    );
  };

  const updateIntolerance = (index: number, field: string, value: string) => {
    const currentIntolerances = formData.food_intolerances || [];
    const updatedIntolerances = currentIntolerances.map(
      (intolerance: any, i: number) =>
        i === index ? { ...intolerance, [field]: value } : intolerance
    );
    handleInputChange("food_intolerances", updatedIntolerances);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Food Intolerances</Label>
        {(formData.food_intolerances || []).map((intolerance: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder="Food item"
              value={intolerance.food}
              onChange={(e) => updateIntolerance(index, "food", e.target.value)}
            />
            <Select
              value={intolerance.severity}
              onValueChange={(value) => updateIntolerance(index, "severity", value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeIntolerance(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addIntolerance}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Intolerance
        </Button>
      </div>
    </div>
  );
}