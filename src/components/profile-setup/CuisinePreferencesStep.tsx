import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface CuisinePreferencesStepProps {
  formData: any;
  handleInputChange: (field: string, value: string | boolean) => void;
}

export function CuisinePreferencesStep({
  formData,
  handleInputChange,
}: CuisinePreferencesStepProps) {
  const cuisineTypes = [
    "Italian",
    "Chinese",
    "Japanese",
    "Mexican",
    "Indian",
    "Mediterranean",
    "Thai",
    "French",
    "Greek",
    "Korean",
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Preferred Cuisines</Label>
        <div className="grid grid-cols-2 gap-4">
          {cuisineTypes.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox
                id={cuisine}
                checked={formData.preferred_cuisines?.includes(cuisine)}
                onCheckedChange={(checked) => {
                  const currentCuisines = formData.preferred_cuisines || [];
                  const newCuisines = checked
                    ? [...currentCuisines, cuisine]
                    : currentCuisines.filter((c: string) => c !== cuisine);
                  handleInputChange("preferred_cuisines", newCuisines);
                }}
              />
              <Label htmlFor={cuisine}>{cuisine}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}