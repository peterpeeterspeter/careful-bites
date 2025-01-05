import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DislikesFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function DislikesField({ value, onChange }: DislikesFieldProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Dislikes</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Dislikes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="avocado">Avocado</SelectItem>
          <SelectItem value="beef">Beef</SelectItem>
          <SelectItem value="beets">Beets</SelectItem>
          <SelectItem value="bell-peppers">Bell Peppers</SelectItem>
          <SelectItem value="blue-cheese">Blue Cheese</SelectItem>
          <SelectItem value="sprouts">Sprouts</SelectItem>
          <SelectItem value="cauliflower">Cauliflower</SelectItem>
          <SelectItem value="eggplant">Eggplant</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}