import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, size = '1024x1024', style = 'vivid' } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // If no OpenAI key, automatically use Pollinations.ai fallback (free, no API key needed)
    if (!apiKey) {
      console.log('OpenAI API key not configured, using Pollinations.ai fallback...');
      
      // Map size to dimensions for Pollinations
      let width = 1024;
      let height = 1024;
      if (size === '1792x1024') {
        width = 1792;
        height = 1024;
      } else if (size === '1024x1792') {
        width = 1024;
        height = 1792;
      }

      // Add random seed to prevent caching and ensure unique images
      const seed = Math.floor(Math.random() * 1000000);
      
      // Use Pollinations.ai - free, no API key needed, real images
      // Adding seed parameter ensures different images for same prompt
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true&enhance=true`;
      
      return NextResponse.json({
        data: [{
          url: pollinationsUrl,
          revised_prompt: prompt
        }],
        provider: 'pollinations',
        model: 'pollinations-ai',
        seed: seed,
        message: 'Generated using Pollinations.ai (free tier - no API key required)'
      });
    }

    // Use OpenAI if key is available
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: size,
        quality: 'hd',
        style: style
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error, trying Pollinations fallback...');
      
      // If OpenAI fails, use Pollinations fallback with seed
      let width = 1024;
      let height = 1024;
      if (size === '1792x1024') {
        width = 1792;
        height = 1024;
      } else if (size === '1024x1792') {
        width = 1024;
        height = 1792;
      }
      
      const seed = Math.floor(Math.random() * 1000000);
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true&enhance=true`;
      
      return NextResponse.json({
        data: [{
          url: pollinationsUrl,
          revised_prompt: prompt
        }],
        provider: 'pollinations',
        model: 'pollinations-ai',
        seed: seed,
        message: 'Generated using Pollinations.ai fallback'
      });
    }

    const data = await response.json();
    return NextResponse.json({
      ...data,
      provider: 'openai',
      model: 'dall-e-3'
    });

  } catch (error: any) {
    console.error('Image generation error:', error);
    
    // Last resort fallback to Pollinations with seed
    try {
      const { prompt, size = '1024x1024' } = await request.json();
      let width = 1024;
      let height = 1024;
      if (size === '1792x1024') {
        width = 1792;
        height = 1024;
      } else if (size === '1024x1792') {
        width = 1024;
        height = 1792;
      }
      
      const seed = Math.floor(Math.random() * 1000000);
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true&enhance=true`;
      
      return NextResponse.json({
        data: [{
          url: pollinationsUrl,
          revised_prompt: prompt
        }],
        provider: 'pollinations',
        model: 'pollinations-ai',
        seed: seed
      });
    } catch (fallbackError) {
      return NextResponse.json(
        { error: error.message || 'Internal server error' },
        { status: 500 }
      );
    }
  }
}
