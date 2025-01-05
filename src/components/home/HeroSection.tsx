import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const dietaryOptions = [
  {
    label: "Gluten-Free",
    value: "gluten-free",
    description: "Recipes without gluten-containing ingredients"
  },
  {
    label: "Keto",
    value: "keto",
    description: "Low-carb, high-fat recipes"
  },
  {
    label: "Vegetarian",
    value: "vegetarian",
    description: "Meat-free recipes"
  },
  {
    label: "Low-Fat",
    value: "low-fat",
    description: "Recipes with reduced fat content"
  },
  {
    label: "Sugar-Free",
    value: "sugar-free",
    description: "No added sugars"
  },
  {
    label: "Gentle on Stomach",
    value: "stomach-friendly",
    description: "Easy to digest recipes"
  }
];

export function HeroSection() {
  const navigate = useNavigate();
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);

  const handleGetStarted = () => {
    navigate("/recipe-generator", { 
      state: { preferences: { dietary: selectedDiets } }
    });
  };

  return (
    <>
      <section className="relative h-[60vh] overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 leading-tight">
            AI-Powered Recipe Generation for Diabetes Management
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 text-white/90">
            Personalized recipes that match your taste and health needs
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-600 text-lg shadow-lg"
            onClick={handleGetStarted}
          >
            <SparklesIcon className="mr-2 h-5 w-5" />
            Generate Your Recipe
          </Button>
        </div>
      </section>

      <Card className="max-w-5xl mx-auto -mt-16 relative z-10 shadow-xl border-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-primary-700">
            Customize Your Recipe Generation
          </CardTitle>
          <p className="text-muted-foreground">
            Select your preferences to get personalized recipes
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Dietary Requirements</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select all that apply to your diet
                </p>
                <ToggleGroup 
                  type="multiple"
                  value={selectedDiets}
                  onValueChange={setSelectedDiets}
                  className="grid grid-cols-2 gap-3"
                >
                  {dietaryOptions.map((option) => (
                    <ToggleGroupItem
                      key={option.value}
                      value={option.value}
                      aria-label={option.label}
                      className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 shadow-sm hover:bg-primary-50 data-[state=on]:bg-primary-100 data-[state=on]:border-primary-200 transition-all duration-200"
                    >
                      <span className="font-medium text-gray-800">{option.label}</span>
                      <span className="text-xs text-gray-500 text-center mt-1">
                        {option.description}
                      </span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-secondary/5 p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-4">Diabetes-Friendly Features</h3>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <SparklesIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Glycemic Index Tracking</p>
                      <p className="text-sm text-muted-foreground">Monitor the GI impact of recipes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <SparklesIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Carb Counting</p>
                      <p className="text-sm text-muted-foreground">Accurate carbohydrate calculations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <SparklesIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Blood Sugar Impact</p>
                      <p className="text-sm text-muted-foreground">Estimated effect on glucose levels</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full shadow-sm"
                size="lg"
                onClick={handleGetStarted}
              >
                <SparklesIcon className="mr-2 h-5 w-5" />
                Generate Your Recipe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}