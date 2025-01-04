import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences, isAnonymous } = await req.json();
    
    console.log('Generating recipe with preferences:', preferences);
    console.log('Is anonymous user:', isAnonymous);

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      throw new Error('OpenAI API key not configured. Please set up your API key in the project settings.');
    }

    if (!openAiKey.startsWith('sk-')) {
      throw new Error('Invalid OpenAI API key format. The key should start with "sk-"');
    }

    // Enhanced prompt for better recipe generation
    const prompt = `Generate a detailed, diabetes-friendly recipe that meets these requirements:
      ${isAnonymous ? '- Basic diabetes-friendly recipe' : `
      - Diabetes Type: ${preferences.diabetesType}
      - Daily Calorie Target: ${preferences.dailyCalorieTarget || 'Not specified'}
      - Activity Level: ${preferences.activityLevel || 'Not specified'}`}
      - Dietary Restrictions: ${preferences.dietaryRestrictions?.join(', ') || 'None'}
      - Food Intolerances: ${preferences.foodIntolerances?.join(', ') || 'None'}
      
      The recipe should be:
      1. Easy to follow
      2. Nutritionally balanced
      3. Blood sugar friendly
      4. Include portion control guidance`;

    console.log('Sending prompt to OpenAI:', prompt);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a specialized AI chef and nutritionist that creates personalized, diabetes-friendly recipes. Always return responses in the following JSON format: { "title": "string", "description": "string", "ingredients": ["string"], "instructions": ["string"], "nutritionalInfo": { "calories": number, "carbs": number, "protein": number, "fat": number, "fiber": number, "sugar": number }, "preparationTime": number, "cookingTime": number, "difficultyLevel": "string", "servings": number, "tips": ["string"], "diabetesFriendlyNotes": "string" }'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('OpenAI API error:', error);
        throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('OpenAI response:', data);

      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response from OpenAI');
      }

      let recipe;
      try {
        recipe = JSON.parse(data.choices[0].message.content);
      } catch (error) {
        console.error('Error parsing OpenAI response:', error);
        throw new Error('Failed to parse recipe data');
      }

      // Save recipe to database if user is authenticated
      if (!isAnonymous) {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
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
            created_by: preferences.profile_id,
            is_approved: true,
          });

        if (insertError) {
          console.error('Error saving recipe:', insertError);
          // Don't throw here, we still want to return the recipe even if saving fails
          console.log('Failed to save recipe but continuing...');
        }
      }

      return new Response(
        JSON.stringify({ recipe }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (openAiError) {
      console.error('OpenAI API call failed:', openAiError);
      throw new Error(`OpenAI API call failed: ${openAiError.message}`);
    }
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