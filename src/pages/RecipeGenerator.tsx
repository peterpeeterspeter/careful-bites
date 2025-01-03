import { useState } from "react";
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

  const generateRecipe = async () => {
    if (!user) {
      toast.error("Please sign in to generate recipes");
      return;
    }

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
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Recipe Generator</h1>
        <Button onClick={generateRecipe} disabled={loading}>
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