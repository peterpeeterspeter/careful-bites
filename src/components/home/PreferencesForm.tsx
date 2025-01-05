import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PreferencesFormProps {
  dietaryOption: string;
  setDietaryOption: (value: string) => void;
  allergies: string;
  setAllergies: (value: string) => void;
  dislikes: string;
  setDislikes: (value: string) => void;
  medicalCondition: string;
  setMedicalCondition: (value: string) => void;
  cuisine: string;
  setCuisine: (value: string) => void;
  onSubmit: () => void;
}

export function PreferencesForm({
  dietaryOption,
  setDietaryOption,
  allergies,
  setAllergies,
  dislikes,
  setDislikes,
  medicalCondition,
  setMedicalCondition,
  cuisine,
  setCuisine,
  onSubmit,
}: PreferencesFormProps) {
  return (
    <>
      <div>
        <h3 className="text-sm font-medium mb-2">Medical Condition</h3>
        <Select value={medicalCondition} onValueChange={setMedicalCondition}>
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

      <div>
        <h3 className="text-sm font-medium mb-2">Target Blood Sugar Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Min (mg/dL)</Label>
            <Input 
              type="number" 
              placeholder="70"
              min="0"
              max="300"
            />
          </div>
          <div>
            <Label>Max (mg/dL)</Label>
            <Input 
              type="number" 
              placeholder="180"
              min="0"
              max="300"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Dietary Preferences</h3>
        <Select value={dietaryOption} onValueChange={setDietaryOption}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Dietary Option" />
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
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Cuisine Type</h3>
        <Select value={cuisine} onValueChange={setCuisine}>
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

      <div>
        <h3 className="text-sm font-medium mb-2">Allergies</h3>
        <Select value={allergies} onValueChange={setAllergies}>
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

      <div>
        <h3 className="text-sm font-medium mb-2">Dislikes</h3>
        <Select value={dislikes} onValueChange={setDislikes}>
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="insulin-sensitive">Insulin Sensitive</Label>
          <Switch id="insulin-sensitive" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="low-sodium">Low Sodium Diet</Label>
          <Switch id="low-sodium" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="kidney-friendly">Kidney Friendly</Label>
          <Switch id="kidney-friendly" />
        </div>
      </div>

      <Button 
        className="w-full shadow-sm"
        onClick={onSubmit}
      >
        <SparklesIcon className="mr-2 h-5 w-5" />
        Generate Recipe
      </Button>
    </>
  );
}