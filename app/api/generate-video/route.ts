import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, model, imageData } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Route to appropriate video generation service
    switch (model) {
      case 'runway':
        return await generateRunwayVideo(prompt, imageData);
      case 'stability':
        return await generateStabilityVideo(prompt, imageData);
      case 'luma':
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

async function generateRunwayVideo(prompt: string, imageData: string | null) {
  const apiKey = process.env.RUNWAY_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Runway API key not configured on server' },
      { status: 500 }
    );
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
    return NextResponse.json(
      { error: errorData.error?.message || 'Runway API error' },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json({ taskId: data.id, provider: 'runway' });
}

async function generateStabilityVideo(prompt: string, imageData: string | null) {
  const apiKey = process.env.STABILITY_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Stability API key not configured on server' },
      { status: 500 }
    );
  }

  if (!imageData) {
    return NextResponse.json(
      { error: 'Stability AI requires an image for video generation' },
      { status: 400 }
    );
  }

  // Convert base64 to blob
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
    const errorData = await response.json();
    return NextResponse.json(
      { error: errorData.message || 'Stability API error' },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json({ taskId: data.id, provider: 'stability' });
}

async function generateLumaVideo(prompt: string, imageData: string | null) {
  const apiKey = process.env.LUMA_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Luma API key not configured on server' },
      { status: 500 }
    );
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

  const response = await fetch('https://api.lumalabs.ai/dream-machine/v1/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json(
      { error: errorData.error || 'Luma API error' },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json({ taskId: data.id, provider: 'luma' });
}
