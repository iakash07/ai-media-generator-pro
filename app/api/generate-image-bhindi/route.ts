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

    // Use Bhindi's Gemini Nano Banana Pro for image generation
    // This is a fallback when OpenAI key is not configured
    const response = await fetch('https://api.bhindi.io/v1/agents/gemini-nano-banana-pro/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        aspectRatio: size === '1792x1024' ? '16:9' : size === '1024x1792' ? '9:16' : '1:1',
        style: style || 'vivid'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to generate image' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Format response to match OpenAI structure
    return NextResponse.json({
      data: [{
        url: data.imageUrl || data.url,
        revised_prompt: prompt
      }]
    });

  } catch (error: any) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
