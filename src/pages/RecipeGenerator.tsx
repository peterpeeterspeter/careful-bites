import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface GeneratedRecipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  preparationTime: number;
  cookingTime: number;
  difficultyLevel: string;
}

export default function RecipeGenerator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
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
    setLoading(true);
    try {
      // Fetch user profile and preferences
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

      // Call the edge function to generate recipe
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
    } else {
      // Handle anonymous user
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
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Recipe Generator</h1>
          {!user && (
            <p className="text-gray-600 mt-2">
              Try it free! {generationsLeft} free recipes remaining
            </p>
          )}
        </div>
        <Button onClick={generateRecipe} disabled={loading || (!user && generationsLeft === 0)}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Recipe"
          )}
        </Button>
      </div>

      {!user && generationsLeft === 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Want More Recipes?</h3>
            <p className="text-gray-600 mb-4">
              Sign up now to unlock unlimited recipe generations and personalized meal planning!
            </p>
            <Button
              onClick={() => window.location.href = '/register'}
              className="bg-[#4CAF50] hover:bg-[#45a049]"
            >
              Sign Up - It's Free
            </Button>
          </CardContent>
        </Card>
      )}

      {recipe && (
        <Card>
          <CardHeader>
            <CardTitle>{recipe.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{recipe.description}</p>
            
            <div>
              <h3 className="font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Instructions</h3>
              <ol className="list-decimal pl-5 space-y-2">
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div>
                <p className="text-sm font-medium">Calories</p>
                <p className="text-2xl font-bold">{recipe.nutritionalInfo.calories}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Carbs</p>
                <p className="text-2xl font-bold">{recipe.nutritionalInfo.carbs}g</p>
              </div>
              <div>
                <p className="text-sm font-medium">Protein</p>
                <p className="text-2xl font-bold">{recipe.nutritionalInfo.protein}g</p>
              </div>
              <div>
                <p className="text-sm font-medium">Fat</p>
                <p className="text-2xl font-bold">{recipe.nutritionalInfo.fat}g</p>
              </div>
            </div>

            <div className="flex justify-between pt-4 text-sm text-muted-foreground">
              <p>Preparation: {recipe.preparationTime} mins</p>
              <p>Cooking: {recipe.cookingTime} mins</p>
              <p>Difficulty: {recipe.difficultyLevel}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
