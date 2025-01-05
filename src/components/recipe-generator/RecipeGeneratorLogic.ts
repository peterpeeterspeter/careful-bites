import { supabase } from "@/lib/supabase";

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
  console.log('Generating recipe with preferences:', preferences);

  try {
    const { data: recipesData, error } = await supabase
      .from('recipe_sources')
      .select('*')
      .eq('diabetes_friendly', true)
      .eq(preferences.cuisine ? 'cuisine_type' : '', preferences.cuisine?.toLowerCase() || '')
      .contains(preferences.dietaryOption && preferences.dietaryOption !== 'classic' ? 'tags' : '', 
                preferences.dietaryOption ? [preferences.dietaryOption.toLowerCase()] : []);

    if (error) {
      console.error('Error fetching recipes:', error);
      throw new Error(`Failed to fetch recipes: ${error.message}`);
    }

    if (!recipesData?.length) {
      console.log('No recipes found matching the criteria');
      return null;
    }

    console.log(`Found ${recipesData.length} matching recipes`);

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
            console.log('Invalid nutritional info for recipe:', recipe.title);
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
      console.log('No valid recipes found after processing');
      return null;
    }

    console.log(`Found ${validRecipes.length} valid recipes after processing`);

    const randomIndex = Math.floor(Math.random() * validRecipes.length);
    const selectedRecipe = validRecipes[randomIndex];

    console.log('Selected recipe:', selectedRecipe.title);

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