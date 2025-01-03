import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { MedicalProfileStep } from "@/components/profile-setup/MedicalProfileStep";
import { DietaryPreferencesStep } from "@/components/profile-setup/DietaryPreferencesStep";
import { ActivityLevelStep } from "@/components/profile-setup/ActivityLevelStep";
import { WeightGoalsStep } from "@/components/profile-setup/WeightGoalsStep";

const steps = [
  "Medical Profile",
  "Diet Preferences",
  "Activity Level",
  "Weight Goals",
];

interface FormData {
  diabetes_type: string;
  diagnosis_date: string;
  last_hba1c: string;
  preferred_glucose_unit: "mg/dL" | "mmol/L";
  insulin_therapy: boolean;
  insulin_pump_user: boolean;
  cgm_user: boolean;
  preferred_meal_times: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  age: string;
  height_cm: string;
  current_weight_kg: string;
  target_weight_kg: string;
  weight_goal_date: string;
  gender: string;
  activity_level: string;
  daily_calorie_target: string;
  budget_preference: string;
  family_size: string;
}

export default function ProfileSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    diabetes_type: "",
    diagnosis_date: "",
    last_hba1c: "",
    preferred_glucose_unit: "mg/dL",
    insulin_therapy: false,
    insulin_pump_user: false,
    cgm_user: false,
    preferred_meal_times: {
      breakfast: "08:00",
      lunch: "13:00",
      dinner: "19:00",
    },
    age: "",
    height_cm: "",
    current_weight_kg: "",
    target_weight_kg: "",
    weight_goal_date: "",
    gender: "",
    activity_level: "",
    daily_calorie_target: "",
    budget_preference: "",
    family_size: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          diabetes_type: formData.diabetes_type,
          diagnosis_date: formData.diagnosis_date,
          last_hba1c: parseFloat(formData.last_hba1c),
          preferred_glucose_unit: formData.preferred_glucose_unit,
          insulin_therapy: formData.insulin_therapy,
          insulin_pump_user: formData.insulin_pump_user,
          cgm_user: formData.cgm_user,
          preferred_meal_times: formData.preferred_meal_times,
          age: parseInt(formData.age),
          height_cm: parseInt(formData.height_cm),
          current_weight_kg: parseFloat(formData.current_weight_kg),
          target_weight_kg: parseFloat(formData.target_weight_kg),
          weight_goal_date: formData.weight_goal_date,
          gender: formData.gender,
          activity_level: formData.activity_level,
          daily_calorie_target: parseInt(formData.daily_calorie_target),
          budget_preference: formData.budget_preference,
          family_size: parseInt(formData.family_size),
        })
        .eq("id", user?.id);

      if (error) throw error;

      toast.success("Profile setup completed!");
      navigate("/");
    } catch (error) {
      toast.error("Error updating profile: " + (error as Error).message);
    }
  };

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
          <DietaryPreferencesStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <ActivityLevelStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <WeightGoalsStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Profile Setup</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleSubmit();
              } else {
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
              }
            }}
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}