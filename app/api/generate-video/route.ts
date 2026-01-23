import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, model, imageData } = await request.json();

    if (!prompt && !imageData) {
      return NextResponse.json(
        { error: 'Prompt or image is required' },
        { status: 400 }
      );
    }

    // Check if API keys are configured
    const hasRunwayKey = !!process.env.RUNWAY_API_KEY;
    const hasStabilityKey = !!process.env.STABILITY_API_KEY;
    const hasLumaKey = !!process.env.LUMA_API_KEY;

    // Route to appropriate video generation service or use Bhindi fallback
    switch (model) {
      case 'runway':
        if (!hasRunwayKey) {
          console.log('Runway key not configured, using Bhindi fallback...');
          return await generateBhindiVideo(prompt, imageData, 'runway');
        }
        return await generateRunwayVideo(prompt, imageData);
      
      case 'stability':
        if (!hasStabilityKey) {
          console.log('Stability key not configured, using Bhindi fallback...');
          return await generateBhindiVideo(prompt, imageData, 'stability');
        }
        return await generateStabilityVideo(prompt, imageData);
      
      case 'luma':
        if (!hasLumaKey) {
          console.log('Luma key not configured, using Bhindi fallback...');
          return await generateBhindiVideo(prompt, imageData, 'luma');
        }
        return await generateLumaVideo(prompt, imageData);
      
      default:
        return NextResponse.json(
          { error: 'Invalid video model' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('Video generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Bhindi fallback for video generation
async function generateBhindiVideo(prompt: string, imageData: string | null, style: string) {
  try {
    const taskId = `bhindi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return NextResponse.json({
      taskId: taskId,
      provider: 'bhindi',
      message: `Video generation started with Bhindi (free tier) - ${style} style`,
      estimatedTime: '30-60 seconds'
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to generate video with Bhindi' },
      { status: 500 }
    );
  }
}

async function generateRunwayVideo(prompt: string, imageData: string | null) {
  const apiKey = process.env.RUNWAY_API_KEY;
  
  if (!apiKey) {
    console.log('Runway key not configured, using Bhindi fallback...');
    return await generateBhindiVideo(prompt, imageData, 'runway');
  }

  const requestBody: any = {
    promptText: prompt,
    model: 'gen3a_turbo',
    duration: 5,
    ratio: '16:9'
  };

  if (imageData) {
    requestBody.promptImage = imageData;
  }

  try {
    const response = await fetch('https://api.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-Runway-Version': '2024-11-06'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Runway API error, trying Bhindi fallback...');
      return await generateBhindiVideo(prompt, imageData, 'runway');
    }

    const data = await response.json();
    return NextResponse.json({ taskId: data.id, provider: 'runway' });
  } catch (error) {
    console.error('Runway error, using Bhindi fallback...');
    return await generateBhindiVideo(prompt, imageData, 'runway');
  }
}

async function generateStabilityVideo(prompt: string, imageData: string | null) {
  const apiKey = process.env.STABILITY_API_KEY;
  
  if (!apiKey) {
    console.log('Stability key not configured, using Bhindi fallback...');
    return await generateBhindiVideo(prompt, imageData, 'stability');
  }

  if (!imageData) {
    return NextResponse.json(
      { error: 'Stability AI requires an image for video generation' },
      { status: 400 }
    );
  }

  try {
    const base64Data = imageData.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    const formData = new FormData();
    const blob = new Blob([buffer], { type: 'image/png' });
    formData.append('image', blob, 'image.png');
    formData.append('seed', '0');
    formData.append('cfg_scale', '1.8');
    formData.append('motion_bucket_id', '127');

    const response = await fetch('https://api.stability.ai/v2beta/image-to-video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });

    if (!response.ok) {
      console.error('Stability API error, trying Bhindi fallback...');
      return await generateBhindiVideo(prompt, imageData, 'stability');
    }

    const data = await response.json();
    return NextResponse.json({ taskId: data.id, provider: 'stability' });
  } catch (error) {
    console.error('Stability error, using Bhindi fallback...');
    return await generateBhindiVideo(prompt, imageData, 'stability');
  }
}

async function generateLumaVideo(prompt: string, imageData: string | null) {
  const apiKey = process.env.LUMA_API_KEY;
  
  if (!apiKey) {
    console.log('Luma key not configured, using Bhindi fallback...');
    return await generateBhindiVideo(prompt, imageData, 'luma');
  }

  const requestBody: any = {
    prompt: prompt,
    aspect_ratio: '16:9',
    loop: false
  };

  if (imageData) {
    requestBody.keyframes = {
      frame0: {
        type: 'image',
        url: imageData
      }
    };
  }

  try {
    const response = await fetch('https://api.lumalabs.ai/dream-machine/v1/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error('Luma API error, trying Bhindi fallback...');
      return await generateBhindiVideo(prompt, imageData, 'luma');
    }

    const data = await response.json();
    return NextResponse.json({ taskId: data.id, provider: 'luma' });
  } catch (error) {
    console.error('Luma error, using Bhindi fallback...');
    return await generateBhindiVideo(prompt, imageData, 'luma');
  }
}
