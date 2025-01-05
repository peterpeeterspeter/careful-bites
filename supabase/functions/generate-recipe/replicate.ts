export async function generateRecipeImage(
  title: string,
  ingredients: string[],
  replicateApiKey: string
): Promise<string> {
  // Create a prompt that highlights the main ingredients and dish
  const mainIngredients = ingredients.slice(0, 3).join(', '); // Take first 3 ingredients
  const prompt = `Photorealistic, professional food photography of ${title} with ${mainIngredients} visible, foodporn, photo style of Skyler Burt, bright lighting, shallow depth of field, high-end restaurant presentation`;

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${replicateApiKey}`,
    },
    body: JSON.stringify({
      version: "a1b90cc0d14132c34ed5e0a85f0d9ce3bb26c03541b48bc5a65eadb1cda59cc4",
      input: {
        prompt,
        negative_prompt: "text, watermark, logo, ugly, deformed, noisy, blurry, low quality, distorted",
        num_inference_steps: 50,
        guidance_scale: 7.5,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Replicate API error: ${response.statusText}`);
  }

  const prediction = await response.json();
  
  // Poll for the result
  const resultResponse = await fetch(
    `https://api.replicate.com/v1/predictions/${prediction.id}`,
    {
      headers: {
        "Authorization": `Token ${replicateApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!resultResponse.ok) {
    throw new Error(`Failed to get prediction result: ${resultResponse.statusText}`);
  }

  const result = await resultResponse.json();
  return result.output[0]; // Return the generated image URL
}