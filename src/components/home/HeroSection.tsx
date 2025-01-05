import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SparklesIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function HeroSection() {
  const navigate = useNavigate();
  const [isPanelOpen, setIsPanelOpen] = useState(true);
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
    <div className="relative flex min-h-[60vh]">
      {/* Left Panel */}
      <div className={`relative transition-all duration-300 ${isPanelOpen ? 'w-96' : 'w-0'}`}>
        <Card className={`h-full border-r transition-all duration-300 rounded-none ${isPanelOpen ? 'opacity-100' : 'opacity-0'}`}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-primary-700 flex justify-between items-center">
              Customize Your Recipe
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsPanelOpen(false)}
                className="h-8 w-8"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Dietary Preferences</h3>
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
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Allergies</h3>
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
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Dislikes</h3>
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

            <div>
              <h3 className="text-sm font-medium mb-2">Medical Condition</h3>
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

            <Button 
              className="w-full shadow-sm"
              onClick={handleGetStarted}
            >
              <SparklesIcon className="mr-2 h-5 w-5" />
              Generate Recipe
            </Button>
          </CardContent>
        </Card>

        {/* Toggle button when panel is closed */}
        <Button 
          variant="secondary"
          size="sm"
          onClick={() => setIsPanelOpen(true)}
          className={`absolute top-4 right-0 translate-x-full rounded-l-none transition-opacity duration-300 ${isPanelOpen ? 'opacity-0' : 'opacity-100'}`}
        >
          <ChevronRightIcon className="h-4 w-4" />
          Options
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-primary-50 to-secondary-50">
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
      </div>
    </div>
  );
}