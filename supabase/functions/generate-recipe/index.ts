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

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    const replicateApiKey = Deno.env.get('REPLICATE_API_KEY');
    
    if (!openAiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!replicateApiKey) {
      throw new Error('Replicate API key not configured');
    }

    // Generate recipe
    const recipe = await generateRecipeWithOpenAI(preferences, openAiKey);
    
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