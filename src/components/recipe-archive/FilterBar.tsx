import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterBar() {
  return (
    <div className="sticky top-0 bg-white z-10 py-4 border-b flex gap-4 overflow-x-auto">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Meal Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="breakfast">Breakfast</SelectItem>
          <SelectItem value="lunch">Lunch</SelectItem>
          <SelectItem value="dinner">Dinner</SelectItem>
          <SelectItem value="snacks">Snacks</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Dietary Requirements" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gluten-free">Gluten-free</SelectItem>
          <SelectItem value="low-carb">Low-carb</SelectItem>
          <SelectItem value="vegetarian">Vegetarian</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Cooking Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="under-30">Under 30 mins</SelectItem>
          <SelectItem value="30-60">30-60 mins</SelectItem>
          <SelectItem value="over-60">Over 60 mins</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Glycemic Index" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}