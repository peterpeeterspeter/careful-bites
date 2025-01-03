import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TreatmentOptionsFieldsProps {
  formData: any;
  handleInputChange: (field: string, value: string | boolean) => void;
}

export function TreatmentOptionsFields({
  formData,
  handleInputChange,
}: TreatmentOptionsFieldsProps) {
  return (
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
  );
}