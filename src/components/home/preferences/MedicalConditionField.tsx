import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MedicalConditionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function MedicalConditionField({ value, onChange }: MedicalConditionFieldProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Medical Condition</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Medical Condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="type1">Type 1 Diabetes</SelectItem>
          <SelectItem value="type2">Type 2 Diabetes</SelectItem>
          <SelectItem value="prediabetic">Prediabetic</SelectItem>
          <SelectItem value="gestational">Gestational Diabetes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}