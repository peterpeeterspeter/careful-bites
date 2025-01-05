import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BloodSugarRangeFieldProps {
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

export function BloodSugarRangeField({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: BloodSugarRangeFieldProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Target Blood Sugar Range</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Min (mg/dL)</Label>
          <Input 
            type="number" 
            placeholder="70"
            min="0"
            max="300"
            value={minValue}
            onChange={(e) => onMinChange(e.target.value)}
          />
        </div>
        <div>
          <Label>Max (mg/dL)</Label>
          <Input 
            type="number" 
            placeholder="180"
            min="0"
            max="300"
            value={maxValue}
            onChange={(e) => onMaxChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}