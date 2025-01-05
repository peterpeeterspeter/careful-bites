import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MedicalConditionField } from "./preferences/MedicalConditionField";
import { BloodSugarRangeField } from "./preferences/BloodSugarRangeField";
import { DietaryPreferencesField } from "./preferences/DietaryPreferencesField";
import { HealthSwitches } from "./preferences/HealthSwitches";

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
  const [minBloodSugar, setMinBloodSugar] = useState("70");
  const [maxBloodSugar, setMaxBloodSugar] = useState("180");
  const [insulinSensitive, setInsulinSensitive] = useState(false);
  const [lowSodium, setLowSodium] = useState(false);
  const [kidneyFriendly, setKidneyFriendly] = useState(false);

  return (
    <>
      <MedicalConditionField 
        value={medicalCondition}
        onChange={setMedicalCondition}
      />

      <BloodSugarRangeField
        minValue={minBloodSugar}
        maxValue={maxBloodSugar}
        onMinChange={setMinBloodSugar}
        onMaxChange={setMaxBloodSugar}
      />

      <DietaryPreferencesField
        value={dietaryOption}
        onChange={setDietaryOption}
      />

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

      <HealthSwitches
        insulinSensitive={insulinSensitive}
        lowSodium={lowSodium}
        kidneyFriendly={kidneyFriendly}
        onInsulinSensitiveChange={setInsulinSensitive}
        onLowSodiumChange={setLowSodium}
        onKidneyFriendlyChange={setKidneyFriendly}
      />

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