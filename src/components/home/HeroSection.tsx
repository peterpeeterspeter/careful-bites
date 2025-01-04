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
      <section className="relative h-[60vh] overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            AI-Powered Recipe Generation for Diabetes Management
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8">
            Personalized recipes that match your taste and health needs
          </p>
          <Button
            size="lg"
            className="bg-[#4CAF50] hover:bg-[#45a049] text-lg"
            onClick={handleGetStarted}
          >
            <SparklesIcon className="mr-2 h-5 w-5" />
            Generate Your Recipe
          </Button>
        </div>
      </section>

      {/* Quick Preference Panel */}
      <Card className="max-w-6xl mx-auto -mt-16 relative z-10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Customize Your Recipe Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dietary Preferences */}
            <div>
              <h3 className="text-lg font-medium mb-4">Dietary Requirements</h3>
              <p className="text-sm text-gray-600 mb-4">Select all that apply to your diet</p>
              <ToggleGroup 
                type="multiple"
                value={selectedDiets}
                onValueChange={setSelectedDiets}
                className="grid grid-cols-2 gap-4"
              >
                {dietaryOptions.map((option) => (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    aria-label={option.label}
                    className="flex flex-col items-center justify-center p-4 gap-2 data-[state=on]:bg-primary/10"
                  >
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-gray-600 text-center">
                      {option.description}
                    </span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Diabetes Management Features */}
            <div className="space-y-6">
              <div className="bg-secondary/10 p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-4">Diabetes-Friendly Features</h3>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-full">
                      <SparklesIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Glycemic Index Tracking</p>
                      <p className="text-sm text-gray-600">Monitor the GI impact of recipes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-full">
                      <SparklesIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Carb Counting</p>
                      <p className="text-sm text-gray-600">Accurate carbohydrate calculations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-full">
                      <SparklesIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Blood Sugar Impact</p>
                      <p className="text-sm text-gray-600">Estimated effect on glucose levels</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full"
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