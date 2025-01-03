import { useProfileForm } from "./useProfileForm";
import { useProfileSubmission } from "./useProfileSubmission";
import { useProfileNavigation } from "./useProfileNavigation";

export const useProfileSetup = () => {
  const { formData, handleInputChange } = useProfileForm();
  const { handleSubmit } = useProfileSubmission(formData);
  const { currentStep, setCurrentStep, handleNext, handlePrevious } = useProfileNavigation();

  return {
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange,
    handleSubmit,
    handleNext: (totalSteps: number) => handleNext(totalSteps, handleSubmit),
    handlePrevious,
  };
};