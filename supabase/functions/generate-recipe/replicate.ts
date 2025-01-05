export async function generateRecipeImage(title: string, ingredients: string[], apiKey: string): Promise<string> {
  const prompt = `photorealistic foodporn photo style of Skyler Burt: ${title} made with ${ingredients.join(', ')}`;
  
  console.log('Generating image with prompt:', prompt);

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "9dbc31460ee47a0583a0a28c45b58f9c3a99f84df45d1f18374f8d621b0a4d29",
        input: {
          prompt: prompt,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.statusText}`);
    }

    const prediction = await response.json();
    console.log('Initial prediction response:', prediction);

    // Poll for the result
    const resultResponse = await pollForResult(prediction.urls.get, apiKey);
    console.log('Final image generation result:', resultResponse);

    if (resultResponse.status === 'succeeded' && resultResponse.output?.[0]) {
      return resultResponse.output[0];
    } else {
      throw new Error('Image generation failed or no output received');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

async function pollForResult(getUrl: string, apiKey: string, maxAttempts = 30): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(getUrl, {
      headers: {
        "Authorization": `Token ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error polling for result: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.status === 'succeeded' || result.status === 'failed') {
      return result;
    }

    // Wait for 2 seconds before the next attempt
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  throw new Error('Polling timeout exceeded');
}