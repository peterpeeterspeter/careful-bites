import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PreferencesForm } from "./PreferencesForm";

interface PreferencesPanelProps {
  onClose: () => void;
  onSubmit: (preferences: {
    dietaryOption: string;
    allergies: string;
    dislikes: string;
    medicalCondition: string;
    cuisine: string;
  }) => void;
}

export function PreferencesPanel({ onClose, onSubmit }: PreferencesPanelProps) {
  const [dietaryOption, setDietaryOption] = useState("");
  const [allergies, setAllergies] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [cuisine, setCuisine] = useState("");

  const handleSubmit = () => {
    onSubmit({
      dietaryOption,
      allergies,
      dislikes,
      medicalCondition,
      cuisine,
    });
  };

  return (
    <Card className="h-full border-r transition-all duration-300 rounded-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-primary-700 flex justify-between items-center">
          Customize Your Recipe
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <PreferencesForm
          dietaryOption={dietaryOption}
          setDietaryOption={setDietaryOption}
          allergies={allergies}
          setAllergies={setAllergies}
          dislikes={dislikes}
          setDislikes={setDislikes}
          medicalCondition={medicalCondition}
          setMedicalCondition={setMedicalCondition}
          cuisine={cuisine}
          setCuisine={setCuisine}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
}