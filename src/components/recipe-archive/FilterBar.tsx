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
          <SelectValue placeholder="Dietary Options" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="classic">Classic</SelectItem>
          <SelectItem value="low-carb">Low Carb</SelectItem>
          <SelectItem value="keto">Keto</SelectItem>
          <SelectItem value="paleo">Paleo</SelectItem>
          <SelectItem value="vegetarian">Vegetarian</SelectItem>
          <SelectItem value="vegan">Vegan</SelectItem>
          <SelectItem value="pescatarian">Pescatarian</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Allergies" />
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

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Dislikes" />
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

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Medical Condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="type1">Diabetic Type 1</SelectItem>
          <SelectItem value="type2">Diabetic Type 2</SelectItem>
          <SelectItem value="prediabetic">Prediabetic</SelectItem>
          <SelectItem value="gestational">Gestational Diabetes</SelectItem>
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