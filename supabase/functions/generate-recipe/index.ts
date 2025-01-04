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

    const openRouterKey = Deno.env.get('OPENAI_API_KEY');
    if (!openRouterKey) {
      throw new Error('OpenRouter API key not configured');
    }

    // Enhanced prompt for better recipe generation
    const prompt = `Generate a detailed, diabetes-friendly recipe. Return ONLY a JSON object with NO additional text or explanation, following this EXACT structure:
    {
      "title": "string",
      "description": "string",
      "ingredients": ["string"],
      "instructions": ["string"],
      "nutritionalInfo": {
        "calories": number,
        "carbs": number,
        "protein": number,
        "fat": number
      },
      "preparationTime": number,
      "cookingTime": number,
      "difficultyLevel": "string"
    }

    The recipe should meet these requirements:
    ${isAnonymous ? '- Basic diabetes-friendly recipe' : `
    - Diabetes Type: ${preferences.diabetesType}
    - Daily Calorie Target: ${preferences.dailyCalorieTarget || 'Not specified'}
    - Activity Level: ${preferences.activityLevel || 'Not specified'}`}
    - Dietary Restrictions: ${preferences.dietaryRestrictions?.join(', ') || 'None'}
    - Food Intolerances: ${preferences.foodIntolerances?.join(', ') || 'None'}
    
    Make sure the recipe is:
    1. Easy to follow
    2. Nutritionally balanced
    3. Blood sugar friendly
    4. Include portion control guidance`;

    console.log('Sending prompt to OpenRouter:', prompt);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openRouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/lovable-chat/lovable',
          'X-Title': 'Lovable Chat',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-2',
          messages: [
            {
              role: 'system',
              content: 'You are a specialized AI chef and nutritionist that creates personalized, diabetes-friendly recipes. You must ONLY return a valid JSON object matching the specified structure, with no additional text or explanation.'
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
        console.error('OpenRouter API error:', error);
        throw new Error(`OpenRouter API error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('OpenRouter raw response:', data);

      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response from OpenRouter');
      }

      // Clean the response content to ensure it's valid JSON
      const cleanContent = data.choices[0].message.content.trim();
      console.log('Cleaned content:', cleanContent);

      let recipe;
      try {
        recipe = JSON.parse(cleanContent);
        
        // Validate required fields
        const requiredFields = ['title', 'description', 'ingredients', 'instructions', 'nutritionalInfo'];
        for (const field of requiredFields) {
          if (!recipe[field]) {
            throw new Error(`Missing required field: ${field}`);
          }
        }
        
        console.log('Successfully parsed recipe:', recipe);
      } catch (error) {
        console.error('Error parsing OpenRouter response:', error);
        console.error('Raw content that failed to parse:', cleanContent);
        throw new Error('Failed to parse recipe data. Please try again.');
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
            servings: recipe.servings || 4,
            calories_per_serving: recipe.nutritionalInfo.calories,
            carbs_per_serving: recipe.nutritionalInfo.carbs,
            protein_per_serving: recipe.nutritionalInfo.protein,
            fat_per_serving: recipe.nutritionalInfo.fat,
            created_by: preferences.profile_id,
            is_approved: true,
          });

        if (insertError) {
          console.error('Error saving recipe:', insertError);
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
    } catch (openRouterError) {
      console.error('OpenRouter API call failed:', openRouterError);
      throw new Error(`OpenRouter API call failed: ${openRouterError.message}`);
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