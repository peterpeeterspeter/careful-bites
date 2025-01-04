import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProfileSetupFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

export function ProfileSetupFooter({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isSubmitting,
}: ProfileSetupFooterProps) {
  return (
    <CardFooter className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0 || isSubmitting}
      >
        Previous
      </Button>
      <Button onClick={onNext} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : currentStep === totalSteps - 1 ? (
          "Complete"
        ) : (
          "Next"
        )}
      </Button>
    </CardFooter>
  );
}