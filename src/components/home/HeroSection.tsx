import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SparklesIcon, ChevronRightIcon } from "lucide-react";
import { PreferencesPanel } from "./PreferencesPanel";

export function HeroSection() {
  const navigate = useNavigate();
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleGetStarted = (preferences: {
    dietaryOption: string;
    allergies: string;
    dislikes: string;
    medicalCondition: string;
    cuisine: string;
  }) => {
    navigate("/recipe-generator", { 
      state: { preferences } 
    });
  };

  return (
    <div className="relative flex min-h-[60vh]">
      {/* Left Panel */}
      <div className={`relative transition-all duration-300 ${isPanelOpen ? 'w-96' : 'w-0'}`}>
        <div className={`transition-all duration-300 ${isPanelOpen ? 'opacity-100' : 'opacity-0'}`}>
          <PreferencesPanel
            onClose={() => setIsPanelOpen(false)}
            onSubmit={handleGetStarted}
          />
        </div>

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
            onClick={() => handleGetStarted({
              dietaryOption: "",
              allergies: "",
              dislikes: "",
              medicalCondition: "",
              cuisine: "",
            })}
          >
            <SparklesIcon className="mr-2 h-5 w-5" />
            Generate Your Recipe
          </Button>
        </div>
      </div>
    </div>
  );
}