import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface MedicalProfileStepProps {
  formData: any;
  handleInputChange: (field: string, value: string | boolean) => void;
}

export function MedicalProfileStep({
  formData,
  handleInputChange,
}: MedicalProfileStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="diabetes_type">Type of Diabetes</Label>
        <Select
          onValueChange={(value) => handleInputChange("diabetes_type", value)}
          value={formData.diabetes_type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="type1">Type 1</SelectItem>
            <SelectItem value="type2">Type 2</SelectItem>
            <SelectItem value="gestational">Gestational</SelectItem>
            <SelectItem value="prediabetes">Prediabetes</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="diagnosis_date">Diagnosis Date</Label>
        <Input
          id="diagnosis_date"
          type="date"
          value={formData.diagnosis_date}
          onChange={(e) => handleInputChange("diagnosis_date", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="last_hba1c">Last HbA1c Reading</Label>
        <Input
          id="last_hba1c"
          type="number"
          step="0.1"
          value={formData.last_hba1c}
          onChange={(e) => handleInputChange("last_hba1c", e.target.value)}
        />
      </div>
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="insulin_therapy">Insulin Therapy</Label>
          <Switch
            id="insulin_therapy"
            checked={formData.insulin_therapy}
            onCheckedChange={(checked) =>
              handleInputChange("insulin_therapy", checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="insulin_pump_user">Insulin Pump User</Label>
          <Switch
            id="insulin_pump_user"
            checked={formData.insulin_pump_user}
            onCheckedChange={(checked) =>
              handleInputChange("insulin_pump_user", checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="cgm_user">CGM User</Label>
          <Switch
            id="cgm_user"
            checked={formData.cgm_user}
            onCheckedChange={(checked) => handleInputChange("cgm_user", checked)}
          />
        </div>
      </div>
    </div>
  );
}