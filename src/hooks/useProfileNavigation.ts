import { useState } from "react";

export const useProfileNavigation = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = (totalSteps: number, onSubmit: () => void) => {
    if (currentStep === totalSteps - 1) {
      onSubmit();
    } else {
      setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return {
    currentStep,
    setCurrentStep,
    handleNext,
    handlePrevious,
  };
};