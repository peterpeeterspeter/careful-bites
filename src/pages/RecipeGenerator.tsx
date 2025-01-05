import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { GeneratorHeader } from "@/components/recipe-generator/GeneratorHeader";
import { SignUpPrompt } from "@/components/recipe-generator/SignUpPrompt";
import { RecipeDisplay } from "@/components/recipe-generator/RecipeDisplay";
import { generateRecipeFromDatabase, type RecipePreferences } from "@/components/recipe-generator/RecipeGeneratorLogic";
import { supabase } from "@/lib/supabase";

export default function RecipeGenerator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [generationsLeft, setGenerationsLeft] = useState(3);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState<RecipePreferences>({
    dietaryOption: "classic",
    allergies: "",
    dislikes: "",
    medicalCondition: "type2",
    cuisine: ""
  });

  // Add mounted ref to prevent state updates after unmount
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  const checkSubscription = async () => {
    if (!mounted.current) return;

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        method: 'POST',
      });

      if (!mounted.current) return;

      if (error) throw error;
      setIsSubscribed(data?.subscribed || false);
    } catch (error) {
      console.error('Error checking subscription:', error);
      if (mounted.current) {
        toast.error('Failed to check subscription status');
      }
    }
  };

  const generateRecipe = async () => {
    if (loading || !mounted.current) {
      console.log("Generation already in progress or component unmounted");
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

    try {
      setLoading(true);
      console.log('Starting recipe generation with preferences:', preferences);
      
      const generatedRecipe = await generateRecipeFromDatabase(preferences);

      if (!mounted.current) return;

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
      if (!mounted.current) return;
      console.error("Error generating recipe:", error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
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