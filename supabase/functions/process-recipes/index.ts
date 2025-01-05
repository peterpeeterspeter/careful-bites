import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { HfInference } from "npm:@huggingface/inference";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const processRecipe = async (recipe: any) => {
  // Basic nutrition validation for diabetes-friendly recipes
  const isLowCarb = recipe.nutritionalInfo?.carbs < 45;
  const isLowSugar = recipe.nutritionalInfo?.sugar < 10;
  const hasGoodFiber = recipe.nutritionalInfo?.fiber > 3;

  return {
    ...recipe,
    diabetes_friendly: isLowCarb && isLowSugar && hasGoodFiber,
    glycemic_load: recipe.nutritionalInfo?.carbs * (recipe.glycemicIndex || 55) / 100,
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { datasetName } = await req.json();
    console.log('Processing dataset:', datasetName);

    // Initialize Hugging Face client
    const hf = new HfInference(Deno.env.get("HUGGINGFACE_API_KEY"));

    // Fetch recipes from dataset
    const response = await fetch(
      `https://huggingface.co/datasets/${datasetName}/raw/main/data.json`
    );
    const recipes = await response.json();

    // Process recipes and prepare for database insertion
    const processedRecipes = await Promise.all(
      recipes.map(processRecipe)
    );

    // Insert into Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error } = await supabaseClient
      .from('recipe_sources')
      .insert(processedRecipes);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, count: processedRecipes.length }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing recipes:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});