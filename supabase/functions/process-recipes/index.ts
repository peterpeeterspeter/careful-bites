import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.6.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function processRecipe(recipe: any) {
  // Process recipe data to match our database schema
  return {
    title: recipe.title,
    description: recipe.description || '',
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    nutritional_info: recipe.nutrition || {},
    glycemic_index: recipe.glycemic_index || null,
    glycemic_load: recipe.glycemic_load || null,
    source: 'huggingface',
    cuisine_type: recipe.cuisine || null,
    meal_type: recipe.meal_type || null,
    diabetes_friendly: true, // We're only importing diabetes-friendly recipes
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { datasetName } = await req.json();
    console.log('Processing dataset:', datasetName);

    // Initialize Hugging Face client with the API key from environment
    const hf = new HfInference(Deno.env.get("Hugging Face API"));
    console.log('Hugging Face client initialized');

    // Fetch recipes from dataset
    const response = await fetch(
      `https://huggingface.co/datasets/${datasetName}/raw/main/data.json`
    );
    const recipes = await response.json();
    console.log(`Fetched ${recipes.length} recipes from dataset`);

    // Process recipes and prepare for database insertion
    const processedRecipes = await Promise.all(
      recipes.map(processRecipe)
    );
    console.log(`Processed ${processedRecipes.length} recipes`);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Insert processed recipes into the database
    const { error } = await supabaseClient
      .from('recipe_sources')
      .insert(processedRecipes);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ 
        message: `Successfully processed and stored ${processedRecipes.length} recipes` 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error in process-recipes function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to process recipes',
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