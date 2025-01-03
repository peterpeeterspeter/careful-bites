import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileSetupHeader } from "@/components/profile-setup/ProfileSetupHeader";
import { ProfileSetupFooter } from "@/components/profile-setup/ProfileSetupFooter";
import { ProfileSetupSteps } from "@/components/profile-setup/ProfileSetupSteps";
import { PROFILE_SETUP_STEPS } from "@/components/profile-setup/profileSetupConfig";
import { useProfileSetup } from "@/hooks/useProfileSetup";

export default function ProfileSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange,
    handleSubmit,
  } = useProfileSetup();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleNext = () => {
    if (currentStep === PROFILE_SETUP_STEPS.length - 1) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => Math.min(PROFILE_SETUP_STEPS.length - 1, prev + 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <ProfileSetupHeader
          currentStep={currentStep}
          steps={PROFILE_SETUP_STEPS}
        />
        <CardContent>
          <ProfileSetupSteps
            currentStep={currentStep}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </CardContent>
        <ProfileSetupFooter
          currentStep={currentStep}
          totalSteps={PROFILE_SETUP_STEPS.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </Card>
    </div>
  );
}