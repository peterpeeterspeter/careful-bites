import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface ProfileSetupFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function ProfileSetupFooter({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: ProfileSetupFooterProps) {
  return (
    <CardFooter className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
      >
        Previous
      </Button>
      <Button onClick={onNext}>
        {currentStep === totalSteps - 1 ? "Complete" : "Next"}
      </Button>
    </CardFooter>
  );
}