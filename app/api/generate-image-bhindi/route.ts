import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, size, style } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Map size to aspect ratio for Gemini Nano Banana Pro
    let aspectRatio = '1:1';
    if (size === '1792x1024') aspectRatio = '16:9';
    else if (size === '1024x1792') aspectRatio = '9:16';

    // Use Bhindi's Gemini Nano Banana Pro for image generation
    // This uses the actual Bhindi API endpoint
    const bhindiApiUrl = process.env.BHINDI_API_URL || 'https://api.bhindi.io';
    const bhindiApiKey = process.env.BHINDI_API_KEY || '';

    const response = await fetch(`${bhindiApiUrl}/v1/image/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(bhindiApiKey && { 'Authorization': `Bearer ${bhindiApiKey}` })
      },
      body: JSON.stringify({
        prompt: prompt,
        aspectRatio: aspectRatio,
        model: 'gemini-nano-banana-pro'
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Bhindi API error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || errorData.message || 'Failed to generate image with Bhindi' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Format response to match OpenAI structure
    return NextResponse.json({
      data: [{
        url: data.imageUrl || data.url || data.data?.url,
        revised_prompt: prompt
      }],
      provider: 'bhindi',
      model: 'gemini-nano-banana-pro'
    });

  } catch (error: any) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
