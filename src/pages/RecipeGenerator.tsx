import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { GeneratorHeader } from "@/components/recipe-generator/GeneratorHeader";
import { SignUpPrompt } from "@/components/recipe-generator/SignUpPrompt";
import { RecipeDisplay } from "@/components/recipe-generator/RecipeDisplay";
import { generateRecipeFromDatabase, type RecipePreferences } from "@/components/recipe-generator/RecipeGeneratorLogic";
import { supabase } from "@/integrations/supabase/client";

export default function RecipeGenerator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [generationsLeft, setGenerationsLeft] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState<RecipePreferences>({
    dietaryOption: "classic",
    allergies: "",
    dislikes: "",
    medicalCondition: "type2",
    cuisine: ""
  });

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        method: 'POST',
      });

      if (error) throw error;
      setIsSubscribed(data?.subscribed || false);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const generateRecipe = async () => {
    if (loading || isGenerating) {
      console.log("Generation already in progress");
      return;
    }

    if (!user && generationsLeft <= 0) {
      toast.error("You've used all your free generations. Please sign up to continue!");
      return;
    }

    if (!isSubscribed && user) {
      toast.error("Please subscribe to generate more recipes!");
      return;
    }

    setLoading(true);
    setIsGenerating(true);

    try {
      const generatedRecipe = await generateRecipeFromDatabase(preferences);

      if (!generatedRecipe) {
        toast.error("No suitable recipe found. Please try adjusting your preferences.");
        return;
      }

      setRecipe(generatedRecipe);
      
      if (!user) {
        const newGenerationsLeft = generationsLeft - 1;
        localStorage.setItem('freeGenerationsLeft', newGenerationsLeft.toString());
        setGenerationsLeft(newGenerationsLeft);
        
        if (newGenerationsLeft === 0) {
          toast.info("That was your last free recipe! Sign up to generate more personalized recipes.");
        } else {
          toast.success(`Recipe generated successfully! ${newGenerationsLeft} free generations left.`);
        }
      } else {
        toast.success("Recipe generated successfully!");
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <GeneratorHeader
        loading={loading}
        generationsLeft={generationsLeft}
        isAuthenticated={!!user}
        onGenerate={generateRecipe}
      />

      {(!user && generationsLeft === 0) || (user && !isSubscribed) ? <SignUpPrompt /> : null}
      {recipe && <RecipeDisplay recipe={recipe} />}
    </div>
  );
}