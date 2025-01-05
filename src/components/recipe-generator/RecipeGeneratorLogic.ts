import { supabase } from "@/integrations/supabase/client";

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
      throw error;
    }

    if (!recipesData?.length) {
      console.log('No recipes found matching the criteria');
      return null;
    }

    const validRecipes = recipesData
      .map(recipe => {
        try {
          const ingredients = Array.isArray(recipe.ingredients) 
            ? recipe.ingredients 
            : typeof recipe.ingredients === 'string'
              ? JSON.parse(recipe.ingredients)
              : [];

          const instructions = Array.isArray(recipe.instructions)
            ? recipe.instructions
            : typeof recipe.instructions === 'string'
              ? JSON.parse(recipe.instructions)
              : [];

          const nutritionalInfo = typeof recipe.nutritional_info === 'string'
            ? JSON.parse(recipe.nutritional_info)
            : recipe.nutritional_info;

          if (!nutritionalInfo || typeof nutritionalInfo !== 'object') {
            return null;
          }

          return {
            title: recipe.title,
            description: recipe.description,
            ingredients,
            instructions,
            nutritional_info: {
              calories: Number(nutritionalInfo.calories) || 0,
              carbs: Number(nutritionalInfo.carbs) || 0,
              protein: Number(nutritionalInfo.protein) || 0,
              fat: Number(nutritionalInfo.fat) || 0
            },
            glycemic_index: recipe.glycemic_index,
            glycemic_load: recipe.glycemic_load,
            cuisine_type: recipe.cuisine_type
          } as RecipeSource;
        } catch (e) {
          console.error('Error processing recipe:', e);
          return null;
        }
      })
      .filter((recipe): recipe is RecipeSource => recipe !== null);

    if (validRecipes.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * validRecipes.length);
    const selectedRecipe = validRecipes[randomIndex];

    return {
      title: selectedRecipe.title,
      description: selectedRecipe.description || '',
      ingredients: selectedRecipe.ingredients,
      instructions: selectedRecipe.instructions,
      nutritionalInfo: selectedRecipe.nutritional_info,
      preparationTime: 30,
      cookingTime: 30,
      difficultyLevel: 'Medium',
      glycemicIndex: selectedRecipe.glycemic_index,
      glycemicLoad: selectedRecipe.glycemic_load,
      glucoseImpact: selectedRecipe.glycemic_load && selectedRecipe.glycemic_load < 10 ? 'Low' : 'Moderate',
    };
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
};