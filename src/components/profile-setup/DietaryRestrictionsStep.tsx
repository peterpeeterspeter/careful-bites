import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface DietaryRestrictionsStepProps {
  formData: any;
  handleInputChange: (field: string, value: string | boolean) => void;
}

export function DietaryRestrictionsStep({
  formData,
  handleInputChange,
}: DietaryRestrictionsStepProps) {
  const dietaryRestrictions = [
    "gluten_free",
    "dairy_free",
    "vegetarian",
    "vegan",
    "low_carb",
    "low_sugar",
    "low_sodium",
  ];

  const formatLabel = (restriction: string) => {
    return restriction
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Dietary Restrictions</Label>
        <div className="grid grid-cols-2 gap-4">
          {dietaryRestrictions.map((restriction) => (
            <div key={restriction} className="flex items-center space-x-2">
              <Checkbox
                id={restriction}
                checked={formData.dietary_restrictions?.includes(restriction)}
                onCheckedChange={(checked) => {
                  const currentRestrictions = formData.dietary_restrictions || [];
                  const newRestrictions = checked
                    ? [...currentRestrictions, restriction]
                    : currentRestrictions.filter((r: string) => r !== restriction);
                  handleInputChange("dietary_restrictions", newRestrictions);
                }}
              />
              <Label htmlFor={restriction}>{formatLabel(restriction)}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}