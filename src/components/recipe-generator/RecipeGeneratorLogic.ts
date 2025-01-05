import { supabase } from "@/integrations/supabase/client";

export interface RecipePreferences {
  dietaryOption: string;
  allergies: string;
  dislikes: string;
  medicalCondition: string;
  cuisine: string;
}

export const generateRecipeFromDatabase = async (preferences: RecipePreferences) => {
  try {
    let query = supabase
      .from('recipe_sources')
      .select('*')
      .eq('diabetes_friendly', true);

    if (preferences.cuisine) {
      query = query.eq('cuisine_type', preferences.cuisine.toLowerCase());
    }

    const { data: recipes, error } = await query;

    if (error) throw error;
    if (!recipes?.length) return null;

    // Select a random recipe from the filtered results
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const selectedRecipe = recipes[randomIndex];

    // Transform to match the expected recipe format
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
    throw error;
  }
};