import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { MedicalProfileStep } from "@/components/profile-setup/MedicalProfileStep";
import { DietaryPreferencesStep } from "@/components/profile-setup/DietaryPreferencesStep";
import { ActivityLevelStep } from "@/components/profile-setup/ActivityLevelStep";
import { WeightGoalsStep } from "@/components/profile-setup/WeightGoalsStep";
import { MedicationStep } from "@/components/profile-setup/MedicationStep";
import { LifestyleStep } from "@/components/profile-setup/LifestyleStep";
import { ProfileSetupHeader } from "@/components/profile-setup/ProfileSetupHeader";
import { ProfileSetupFooter } from "@/components/profile-setup/ProfileSetupFooter";
import { useProfileSetup } from "@/hooks/useProfileSetup";

const steps = [
  "Medical Profile",
  "Medications",
  "Diet Preferences",
  "Activity Level",
  "Weight Goals",
  "Lifestyle",
];

export default function ProfileSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, formData, handleInputChange, handleSubmit } = useProfileSetup();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const renderStep = () => {
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
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <ProfileSetupHeader currentStep={currentStep} steps={steps} />
        <CardContent>{renderStep()}</CardContent>
        <ProfileSetupFooter
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </Card>
    </div>
  );
}