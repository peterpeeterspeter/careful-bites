import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface RecipePreferences {
  dietaryOption: string;
  allergies: string;
  dislikes: string;
  medicalCondition: string;
  cuisine: string;
}

interface RecipeSource {
  title: string;
  description: string | null;
  ingredients: string[];
  instructions: string[];
  nutritional_info: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  glycemic_index: number | null;
  glycemic_load: number | null;
  cuisine_type: string | null;
}

export const generateRecipeFromDatabase = async (preferences: RecipePreferences) => {
  try {
    console.log('Starting recipe generation with preferences:', preferences);
    
    let query = supabase
      .from('recipe_sources')
      .select('*')
      .eq('diabetes_friendly', true)
      .limit(50);

    if (preferences.cuisine) {
      query = query.eq('cuisine_type', preferences.cuisine.toLowerCase());
    }

    if (preferences.dietaryOption !== 'classic') {
      query = query.contains('tags', [preferences.dietaryOption]);
    }

    const { data: recipesData, error } = await query;

    if (error) {
      console.error('Error fetching recipes:', error);
      toast.error('Failed to fetch recipes. Please try again.');
      throw error;
    }

    if (!recipesData?.length) {
      console.log('No recipes found matching the criteria');
      toast.error('No recipes found matching your preferences. Try adjusting your filters.');
      return null;
    }

    // Parse the JSON data into properly typed recipe objects
    const recipes = recipesData.map(recipe => ({
      ...recipe,
      ingredients: Array.isArray(recipe.ingredients) 
        ? recipe.ingredients 
        : typeof recipe.ingredients === 'string'
          ? JSON.parse(recipe.ingredients)
          : [],
      instructions: Array.isArray(recipe.instructions)
        ? recipe.instructions
        : typeof recipe.instructions === 'string'
          ? JSON.parse(recipe.instructions)
          : []
    })) as RecipeSource[];

    // Filter out recipes with allergens if specified
    let filteredRecipes = recipes;
    if (preferences.allergies) {
      filteredRecipes = recipes.filter(recipe => {
        return !recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(preferences.allergies.toLowerCase())
        );
      });
    }

    if (filteredRecipes.length === 0) {
      console.log('No recipes found after allergy filtering');
      toast.error('No safe recipes found considering your allergies. Try different preferences.');
      return null;
    }

    // Select a random recipe from the filtered results
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    const selectedRecipe = filteredRecipes[randomIndex];

    console.log('Selected recipe:', selectedRecipe);

    return {
      title: selectedRecipe.title,
      description: selectedRecipe.description || '',
      ingredients: selectedRecipe.ingredients,
      instructions: selectedRecipe.instructions,
      nutritionalInfo: selectedRecipe.nutritional_info,
      preparationTime: 30, // Default value
      cookingTime: 30, // Default value
      difficultyLevel: 'Medium',
      glycemicIndex: selectedRecipe.glycemic_index,
      glycemicLoad: selectedRecipe.glycemic_load,
      glucoseImpact: selectedRecipe.glycemic_load < 10 ? 'Low' : 'Moderate',
    };
  } catch (error) {
    console.error('Error generating recipe:', error);
    toast.error('Failed to generate recipe. Please try again.');
    throw error;
  }
};