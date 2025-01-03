import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DiabetesInfoFieldsProps {
  formData: any;
  handleInputChange: (field: string, value: string | boolean) => void;
}

export function DiabetesInfoFields({
  formData,
  handleInputChange,
}: DiabetesInfoFieldsProps) {
  return (
    <>
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
    </>
  );
}