import { MedicalProfileStep } from "./MedicalProfileStep";
import { DietaryPreferencesStep } from "./DietaryPreferencesStep";
import { ActivityLevelStep } from "./ActivityLevelStep";
import { WeightGoalsStep } from "./WeightGoalsStep";
import { MedicationStep } from "./MedicationStep";
import { LifestyleStep } from "./LifestyleStep";
import { CuisinePreferencesStep } from "./CuisinePreferencesStep";
import { DietaryRestrictionsStep } from "./DietaryRestrictionsStep";
import { FoodIntolerancesStep } from "./FoodIntolerancesStep";

interface ProfileSetupStepsProps {
  currentStep: number;
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

export function ProfileSetupSteps({
  currentStep,
  formData,
  handleInputChange,
}: ProfileSetupStepsProps) {
  switch (currentStep) {
    case 0:
      return (
        <MedicalProfileStep
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 1:
      return (
        <MedicationStep
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 2:
      return (
        <DietaryPreferencesStep
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 3:
      return (
        <ActivityLevelStep
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 4:
      return (
        <WeightGoalsStep
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 5:
      return (
        <LifestyleStep
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 6:
      return (
        <CuisinePreferencesStep
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 7:
      return (
        <DietaryRestrictionsStep
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 8:
      return (
        <FoodIntolerancesStep
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    default:
      return null;
  }
}