import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Recipe } from './types.ts';

export async function saveRecipeToDatabase(
  recipe: Recipe,
  imageUrl: string,
  profileId: string,
  supabaseUrl: string,
  supabaseServiceKey: string
): Promise<void> {
  const supabaseClient = createClient(
    supabaseUrl,
    supabaseServiceKey
  );

  const { error: insertError } = await supabaseClient
    .from('recipes')
    .insert({
      title: recipe.title,
      description: recipe.description,
      instructions: recipe.instructions.join('\n'),
      preparation_time: recipe.preparationTime,
      cooking_time: recipe.cookingTime,
      servings: recipe.servings,
      calories_per_serving: recipe.nutritionalInfo.calories,
      carbs_per_serving: recipe.nutritionalInfo.carbs,
      protein_per_serving: recipe.nutritionalInfo.protein,
      fat_per_serving: recipe.nutritionalInfo.fat,
      sugar_per_serving: recipe.nutritionalInfo.sugar,
      created_by: profileId,
      is_approved: true,
      image_url: imageUrl,
    });

  if (insertError) {
    console.error('Error saving recipe:', insertError);
    throw new Error('Failed to save recipe to database');
  }
}