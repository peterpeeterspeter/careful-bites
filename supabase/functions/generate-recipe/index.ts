import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences, isAnonymous } = await req.json();
    
    console.log('Generating recipe with preferences:', preferences);
    console.log('Is anonymous user:', isAnonymous);

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
      4. Include portion control guidance
      
      Format the response as a JSON object with:
      {
        "title": "string",
        "description": "string",
        "ingredients": ["string"],
        "instructions": ["string"],
        "nutritionalInfo": {
          "calories": number,
          "carbs": number,
          "protein": number,
          "fat": number,
          "fiber": number,
          "sugar": number
        },
        "preparationTime": number,
        "cookingTime": number,
        "difficultyLevel": "string",
        "servings": number,
        "tips": ["string"],
        "diabetesFriendlyNotes": "string"
      }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a specialized AI chef and nutritionist that creates personalized, diabetes-friendly recipes. Always return responses in valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate recipe');
    }

    const data = await response.json();
    const recipe = JSON.parse(data.choices[0].message.content);

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
        throw new Error('Failed to save recipe');
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
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
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