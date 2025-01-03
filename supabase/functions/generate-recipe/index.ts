import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profile, dietaryPreferences, foodIntolerances } = await req.json();

    // Construct the prompt based on user preferences
    const prompt = `Generate a diabetes-friendly recipe that meets these requirements:
      - Diabetes Type: ${profile.diabetes_type}
      - Dietary Restrictions: ${dietaryPreferences?.map(p => p.restriction).join(', ') || 'None'}
      - Food Intolerances: ${foodIntolerances?.map(f => f.intolerance).join(', ') || 'None'}
      - Daily Calorie Target: ${profile.daily_calorie_target || 'Not specified'}
      
      The recipe should include:
      1. Title
      2. Brief description
      3. List of ingredients with measurements
      4. Step-by-step instructions
      5. Nutritional information (calories, carbs, protein, fat)
      6. Preparation time
      7. Cooking time
      8. Difficulty level
      
      Format the response as a JSON object.`;

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
            content: 'You are a specialized AI chef that creates personalized, diabetes-friendly recipes. Always return responses in valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const recipe = JSON.parse(data.choices[0].message.content);

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