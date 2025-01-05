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
  const [preferences, setPreferences] = useState<RecipePreferences>({
    dietaryOption: "classic",
    allergies: "",
    dislikes: "",
    medicalCondition: "type2",
    cuisine: ""
  });

  useEffect(() => {
    const storedGenerations = localStorage.getItem('freeGenerationsLeft');
    if (storedGenerations === null) {
      localStorage.setItem('freeGenerationsLeft', '3');
    } else {
      setGenerationsLeft(parseInt(storedGenerations));
    }

    if (user) {
      fetchUserPreferences();
    }
  }, [user]);

  const fetchUserPreferences = async () => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("diabetes_type, dietary_restrictions")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      const { data: dietaryPreferences, error: dietaryError } = await supabase
        .from("dietary_preferences")
        .select("restriction")
        .eq("profile_id", user.id);

      if (dietaryError) throw dietaryError;

      const { data: foodIntolerances, error: intolerancesError } = await supabase
        .from("food_intolerances")
        .select("intolerance")
        .eq("profile_id", user.id);

      if (intolerancesError) throw intolerancesError;

      const { data: dietStyles, error: dietStylesError } = await supabase
        .from("user_diet_styles")
        .select("diet_style")
        .eq("profile_id", user.id);

      if (dietStylesError) throw dietStylesError;

      setPreferences({
        dietaryOption: dietStyles?.[0]?.diet_style || "classic",
        allergies: foodIntolerances?.[0]?.intolerance || "",
        dislikes: "",
        medicalCondition: profile?.diabetes_type || "type2",
        cuisine: ""
      });
    } catch (error) {
      console.error("Error fetching preferences:", error);
      toast.error("Failed to load preferences");
    }
  };

  const generateRecipe = async () => {
    if (loading) {
      console.log("Generation already in progress");
      return;
    }

    if (!user && generationsLeft <= 0) {
      toast.error("You've used all your free generations. Please sign up to continue!");
      return;
    }

    setLoading(true);
    console.log("Starting recipe generation with preferences:", preferences);

    try {
      const generatedRecipe = await generateRecipeFromDatabase(preferences);

      if (!generatedRecipe) {
        throw new Error("No suitable recipe found");
      }

      console.log("Recipe generation successful:", generatedRecipe);
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