import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileSetupHeaderProps {
  currentStep: number;
  steps: readonly string[];
}

export function ProfileSetupHeader({ currentStep, steps }: ProfileSetupHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>Profile Setup</CardTitle>
      <CardDescription>
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
      </CardDescription>
    </CardHeader>
  );
}