import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MedicationStepProps {
  formData: any;
  handleInputChange: (field: string, value: string | boolean) => void;
}

export function MedicationStep({
  formData,
  handleInputChange,
}: MedicationStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="insulin_regimen">Insulin Regimen</Label>
        <Select
          onValueChange={(value) => handleInputChange("insulin_regimen", value)}
          value={formData.insulin_regimen}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select insulin regimen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basal">Basal Only</SelectItem>
            <SelectItem value="basal_bolus">Basal-Bolus</SelectItem>
            <SelectItem value="pump">Insulin Pump</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="glucose_monitor_device">Glucose Monitoring Device</Label>
        <Select
          onValueChange={(value) => handleInputChange("glucose_monitor_device", value)}
          value={formData.glucose_monitor_device}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select monitoring device" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cgm">Continuous Glucose Monitor (CGM)</SelectItem>
            <SelectItem value="flash">Flash Glucose Monitor</SelectItem>
            <SelectItem value="meter">Blood Glucose Meter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="medications_reminder">Medication Reminders</Label>
          <Switch
            id="medications_reminder"
            checked={formData.medications_reminder}
            onCheckedChange={(checked) =>
              handleInputChange("medications_reminder", checked)
            }
          />
        </div>
      </div>
    </div>
  );
}