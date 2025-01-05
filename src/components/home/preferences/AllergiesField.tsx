import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AllergiesFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function AllergiesField({ value, onChange }: AllergiesFieldProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Allergies</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Allergies" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="shellfish">Shellfish</SelectItem>
          <SelectItem value="fish">Fish</SelectItem>
          <SelectItem value="gluten">Gluten</SelectItem>
          <SelectItem value="dairy">Dairy</SelectItem>
          <SelectItem value="peanut">Peanut</SelectItem>
          <SelectItem value="soy">Soy</SelectItem>
          <SelectItem value="egg">Egg</SelectItem>
          <SelectItem value="mustard">Mustard</SelectItem>
          <SelectItem value="sesame">Sesame</SelectItem>
          <SelectItem value="nightshade">Nightshade</SelectItem>
          <SelectItem value="sulfite">Sulfite</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}