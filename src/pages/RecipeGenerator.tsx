import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { GeneratorHeader } from "@/components/recipe-generator/GeneratorHeader";
import { SignUpPrompt } from "@/components/recipe-generator/SignUpPrompt";
import { RecipeDisplay } from "@/components/recipe-generator/RecipeDisplay";

export default function RecipeGenerator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [generationsLeft, setGenerationsLeft] = useState(3);
  const [preferences, setPreferences] = useState({
    diabetesType: "type2",
    dietaryRestrictions: [] as string[],
    foodIntolerances: [] as string[]
  });

  useEffect(() => {
    const storedGenerations = localStorage.getItem('freeGenerationsLeft');
    if (storedGenerations === null) {
      localStorage.setItem('freeGenerationsLeft', '3');
    } else {
      setGenerationsLeft(parseInt(storedGenerations));
    }
  }, []);

  const generateRecipe = async () => {
    if (user) {
      await generateAuthenticatedRecipe();
    } else {
      await generateAnonymousRecipe();
    }
  };

  const generateAuthenticatedRecipe = async () => {
    setLoading(true);
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: dietaryPreferences } = await supabase
        .from("dietary_preferences")
        .select("*")
        .eq("profile_id", user.id);

      const { data: foodIntolerances } = await supabase
        .from("food_intolerances")
        .select("*")
        .eq("profile_id", user.id);

      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: {
          profile,
          dietaryPreferences,
          foodIntolerances,
        },
      });

      if (error) throw error;
      setRecipe(data.recipe);
      toast.success("Recipe generated successfully!");
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast.error("Failed to generate recipe");
    } finally {
      setLoading(false);
    }
  };

  const generateAnonymousRecipe = async () => {
    const remainingGenerations = parseInt(localStorage.getItem('freeGenerationsLeft') || '0');
    
    if (remainingGenerations <= 0) {
      toast.error("You've used all your free generations. Please sign up to continue!");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: {
          preferences,
          isAnonymous: true
        },
      });

      if (error) throw error;
      
      setRecipe(data.recipe);
      const newGenerationsLeft = remainingGenerations - 1;
      localStorage.setItem('freeGenerationsLeft', newGenerationsLeft.toString());
      setGenerationsLeft(newGenerationsLeft);
      
      if (newGenerationsLeft === 0) {
        toast.info("That was your last free recipe! Sign up to generate more personalized recipes.");
      } else {
        toast.success(`Recipe generated successfully! ${newGenerationsLeft} free generations left.`);
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast.error("Failed to generate recipe");
    } finally {
      setLoading(false);
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

      {!user && generationsLeft === 0 && <SignUpPrompt />}
      {recipe && <RecipeDisplay recipe={recipe} />}
    </div>
  );
}