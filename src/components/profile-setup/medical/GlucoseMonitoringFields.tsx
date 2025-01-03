import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface GlucoseMonitoringFieldsProps {
  formData: any;
  handleInputChange: (field: string, value: string | boolean) => void;
}

export function GlucoseMonitoringFields({
  formData,
  handleInputChange,
}: GlucoseMonitoringFieldsProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="preferred_glucose_unit">Preferred Glucose Unit</Label>
      <Select
        onValueChange={(value) =>
          handleInputChange("preferred_glucose_unit", value)
        }
        value={formData.preferred_glucose_unit}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mg/dL">mg/dL</SelectItem>
          <SelectItem value="mmol/L">mmol/L</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}