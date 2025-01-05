import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CuisineFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function CuisineField({ value, onChange }: CuisineFieldProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Cuisine Type</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Cuisine" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="italian">Italian</SelectItem>
          <SelectItem value="mexican">Mexican</SelectItem>
          <SelectItem value="chinese">Chinese</SelectItem>
          <SelectItem value="japanese">Japanese</SelectItem>
          <SelectItem value="indian">Indian</SelectItem>
          <SelectItem value="mediterranean">Mediterranean</SelectItem>
          <SelectItem value="american">American</SelectItem>
          <SelectItem value="french">French</SelectItem>
          <SelectItem value="thai">Thai</SelectItem>
          <SelectItem value="greek">Greek</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}