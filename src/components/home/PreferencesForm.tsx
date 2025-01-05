import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MedicalConditionField } from "./preferences/MedicalConditionField";
import { BloodSugarRangeField } from "./preferences/BloodSugarRangeField";
import { DietaryPreferencesField } from "./preferences/DietaryPreferencesField";
import { HealthSwitches } from "./preferences/HealthSwitches";
import { CuisineField } from "./preferences/CuisineField";
import { AllergiesField } from "./preferences/AllergiesField";
import { DislikesField } from "./preferences/DislikesField";

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

      <CuisineField
        value={cuisine}
        onChange={setCuisine}
      />

      <AllergiesField
        value={allergies}
        onChange={setAllergies}
      />

      <DislikesField
        value={dislikes}
        onChange={setDislikes}
      />

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