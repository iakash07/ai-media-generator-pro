import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, aspectRatio = '1:1', apiKey } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key is required' },
        { status: 400 }
      );
    }

    // Call Google Gemini API for image generation
    // Using Imagen 3 via Vertex AI
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [
            {
              prompt: prompt,
            },
          ],
          parameters: {
            sampleCount: 1,
            aspectRatio: aspectRatio,
            safetySetting: 'block_some',
            personGeneration: 'allow_adult',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Google Gemini API error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to generate image with Google Gemini');
    }

    const data = await response.json();

    // Extract image from response
    const predictions = data.predictions || [];
    if (predictions.length === 0 || !predictions[0].bytesBase64Encoded) {
      throw new Error('No image generated');
    }

    // Convert base64 to data URL
    const imageBase64 = predictions[0].bytesBase64Encoded;
    const imageUrl = `data:image/png;base64,${imageBase64}`;

    return NextResponse.json({
      imageUrl,
      success: true,
      provider: 'google-gemini',
    });
  } catch (error: any) {
    console.error('Google Gemini image generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    );
  }
}
