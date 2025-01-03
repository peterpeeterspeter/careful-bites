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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const steps = [
  "Medical Profile",
  "Diet Preferences",
  "Activity Level",
  "Weight Goals",
];

export default function ProfileSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    diabetes_type: "",
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          diabetes_type: formData.diabetes_type,
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diabetes_type">Type of Diabetes</Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("diabetes_type", value)
                }
                value={formData.diabetes_type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                  <SelectItem value="gestational">Gestational</SelectItem>
                  <SelectItem value="prediabetes">Prediabetes</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget_preference">Budget Preference</Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("budget_preference", value)
                }
                value={formData.budget_preference}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget-friendly</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="family_size">Family Size</Label>
              <Input
                id="family_size"
                type="number"
                value={formData.family_size}
                onChange={(e) => handleInputChange("family_size", e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activity_level">Activity Level</Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("activity_level", value)
                }
                value={formData.activity_level}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="lightly_active">Lightly Active</SelectItem>
                  <SelectItem value="moderately_active">
                    Moderately Active
                  </SelectItem>
                  <SelectItem value="very_active">Very Active</SelectItem>
                  <SelectItem value="extra_active">Extra Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="daily_calorie_target">
                Daily Calorie Target (kcal)
              </Label>
              <Input
                id="daily_calorie_target"
                type="number"
                value={formData.daily_calorie_target}
                onChange={(e) =>
                  handleInputChange("daily_calorie_target", e.target.value)
                }
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_weight_kg">Current Weight (kg)</Label>
              <Input
                id="current_weight_kg"
                type="number"
                step="0.1"
                value={formData.current_weight_kg}
                onChange={(e) =>
                  handleInputChange("current_weight_kg", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_weight_kg">Target Weight (kg)</Label>
              <Input
                id="target_weight_kg"
                type="number"
                step="0.1"
                value={formData.target_weight_kg}
                onChange={(e) =>
                  handleInputChange("target_weight_kg", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight_goal_date">Target Date</Label>
              <Input
                id="weight_goal_date"
                type="date"
                value={formData.weight_goal_date}
                onChange={(e) =>
                  handleInputChange("weight_goal_date", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => handleInputChange("gender", value)}
                value={formData.gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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