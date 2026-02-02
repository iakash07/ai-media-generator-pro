import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, aspectRatio = '1:1' } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Call Bhindi's Gemini Nano Banana Pro API
    const response = await fetch('https://api.bhindi.io/v1/gemini-nano-banana-pro/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BHINDI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        aspectRatio,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate image');
    }

    const data = await response.json();

    return NextResponse.json({
      imageUrl: data.imageUrl || data.url,
      success: true,
    });
  } catch (error: any) {
    console.error('Gemini image generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    );
  }
}
