import { Recipe } from './types.ts';

export async function generateRecipeWithOpenAI(
  prompt: string,
  openRouterKey: string
): Promise<Recipe> {
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
    throw new Error(`OpenRouter API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  const cleanContent = data.choices[0].message.content.trim();
  return JSON.parse(cleanContent);
}