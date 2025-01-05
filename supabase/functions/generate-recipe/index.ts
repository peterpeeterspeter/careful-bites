import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { GenerateRecipeRequest } from "./types.ts";
import { generateRecipeWithOpenAI } from "./openai.ts";
import { generateRecipeImage } from "./replicate.ts";
import { saveRecipeToDatabase } from "./database.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences, isAnonymous, profile_id } = await req.json() as GenerateRecipeRequest;
    
    console.log('Generating recipe with preferences:', preferences);
    console.log('Is anonymous user:', isAnonymous);

    const openRouterKey = Deno.env.get('OPENAI_API_KEY');
    const replicateApiKey = Deno.env.get('REPLICATE_API_KEY');
    
    if (!openRouterKey) {
      throw new Error('OpenRouter API key not configured');
    }

    if (!replicateApiKey) {
      throw new Error('Replicate API key not configured');
    }

    // Build the prompt for recipe generation
    const dietaryRestrictionsStr = preferences.dietaryRestrictions?.length > 0 
      ? `Dietary Restrictions: ${preferences.dietaryRestrictions.join(', ')}`
      : 'No specific dietary restrictions';

    const foodIntolerancesStr = preferences.foodIntolerances?.length > 0
      ? `Food Intolerances: ${preferences.foodIntolerances.join(', ')}`
      : 'No specific food intolerances';

    const dietStylesStr = preferences.dietStyles?.length > 0
      ? `Diet Styles: ${preferences.dietStyles.join(', ')}`
      : 'No specific diet styles';

    const prompt = `Generate a detailed recipe that meets these specific dietary requirements...`;
    
    // Generate recipe
    const recipe = await generateRecipeWithOpenAI(prompt, openRouterKey);
    
    // Generate image for the recipe
    const imageUrl = await generateRecipeImage(
      recipe.title,
      recipe.ingredients,
      replicateApiKey
    );

    // Save recipe to database if user is authenticated
    if (!isAnonymous && profile_id) {
      await saveRecipeToDatabase(
        recipe,
        imageUrl,
        profile_id,
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );
    }

    return new Response(
      JSON.stringify({ recipe: { ...recipe, image_url: imageUrl } }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate recipe',
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});