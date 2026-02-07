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

    const bhindiApiKey = process.env.BHINDI_API_KEY;
    
    if (!bhindiApiKey) {
      return NextResponse.json(
        { error: 'Bhindi API key is not configured. Please add BHINDI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    // Call Bhindi's Gemini Nano Banana Pro API
    const response = await fetch('https://api.bhindi.io/v1/agents/gemini-nano-banana-pro/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bhindiApiKey}`,
      },
      body: JSON.stringify({
        prompt,
        aspectRatio,
        useSearchGrounding: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Bhindi API error:', errorText);
      throw new Error(`Bhindi API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Extract the image URL from the response
    const imageUrl = data.urls?.[0] || data.imageUrl || data.url;

    if (!imageUrl) {
      console.error('No image URL in response:', data);
      throw new Error('No image URL returned from API');
    }

    return NextResponse.json({
      imageUrl,
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
