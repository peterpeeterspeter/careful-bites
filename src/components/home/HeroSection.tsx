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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function HeroSection() {
  const navigate = useNavigate();
  const [dietaryOption, setDietaryOption] = useState("");
  const [allergies, setAllergies] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");

  const handleGetStarted = () => {
    navigate("/recipe-generator", { 
      state: { 
        preferences: { 
          dietaryOption,
          allergies,
          dislikes,
          medicalCondition
        } 
      }
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
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Dietary Preferences</h3>
                <div className="space-y-4">
                  <Select value={dietaryOption} onValueChange={setDietaryOption}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Dietary Option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="low-carb">Low Carb</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="paleo">Paleo</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={allergies} onValueChange={setAllergies}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Allergies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shellfish">Shellfish</SelectItem>
                      <SelectItem value="fish">Fish</SelectItem>
                      <SelectItem value="gluten">Gluten</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="peanut">Peanut</SelectItem>
                      <SelectItem value="soy">Soy</SelectItem>
                      <SelectItem value="egg">Egg</SelectItem>
                      <SelectItem value="mustard">Mustard</SelectItem>
                      <SelectItem value="sesame">Sesame</SelectItem>
                      <SelectItem value="nightshade">Nightshade</SelectItem>
                      <SelectItem value="sulfite">Sulfite</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={dislikes} onValueChange={setDislikes}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Dislikes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avocado">Avocado</SelectItem>
                      <SelectItem value="beef">Beef</SelectItem>
                      <SelectItem value="beets">Beets</SelectItem>
                      <SelectItem value="bell-peppers">Bell Peppers</SelectItem>
                      <SelectItem value="blue-cheese">Blue Cheese</SelectItem>
                      <SelectItem value="sprouts">Sprouts</SelectItem>
                      <SelectItem value="cauliflower">Cauliflower</SelectItem>
                      <SelectItem value="eggplant">Eggplant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Medical Profile</h3>
                <Select value={medicalCondition} onValueChange={setMedicalCondition}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Medical Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="type1">Diabetic Type 1</SelectItem>
                    <SelectItem value="type2">Diabetic Type 2</SelectItem>
                    <SelectItem value="prediabetic">Prediabetic</SelectItem>
                    <SelectItem value="gestational">Gestational Diabetes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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