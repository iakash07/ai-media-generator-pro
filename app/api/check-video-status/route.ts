import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { taskId, provider } = await request.json();

    if (!taskId || !provider) {
      return NextResponse.json(
        { error: 'Task ID and provider are required' },
        { status: 400 }
      );
    }

    switch (provider) {
      case 'runway':
        return await checkRunwayStatus(taskId);
      case 'stability':
        return await checkStabilityStatus(taskId);
      case 'luma':
        return await checkLumaStatus(taskId);
      default:
        return NextResponse.json(
          { error: 'Invalid provider' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

async function checkRunwayStatus(taskId: string) {
  const apiKey = process.env.RUNWAY_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Runway API key not configured' },
      { status: 500 }
    );
  }

  const response = await fetch(`https://api.runwayml.com/v1/tasks/${taskId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-Runway-Version': '2024-11-06'
    }
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to check Runway status' },
      { status: response.status }
    );
  }

  const data = await response.json();
  
  return NextResponse.json({
    status: data.status,
    videoUrl: data.status === 'SUCCEEDED' ? (data.output?.[0] || data.artifacts?.[0]?.url) : null
  });
}

async function checkStabilityStatus(taskId: string) {
  const apiKey = process.env.STABILITY_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Stability API key not configured' },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://api.stability.ai/v2beta/image-to-video/result/${taskId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'video/*'
      }
    }
  );

  if (response.status === 202) {
    return NextResponse.json({
      status: 'PROCESSING',
      videoUrl: null
    });
  }

  if (response.ok) {
    const videoBlob = await response.blob();
    const buffer = await videoBlob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const videoUrl = `data:video/mp4;base64,${base64}`;
    
    return NextResponse.json({
      status: 'SUCCEEDED',
      videoUrl: videoUrl
    });
  }

  return NextResponse.json(
    { error: 'Failed to check Stability status' },
    { status: response.status }
  );
}

async function checkLumaStatus(taskId: string) {
  const apiKey = process.env.LUMA_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Luma API key not configured' },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://api.lumalabs.ai/dream-machine/v1/generations/${taskId}`,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to check Luma status' },
      { status: response.status }
    );
  }

  const data = await response.json();
  
  let status = 'PROCESSING';
  if (data.state === 'completed') status = 'SUCCEEDED';
  if (data.state === 'failed') status = 'FAILED';
  
  return NextResponse.json({
    status: status,
    videoUrl: data.state === 'completed' ? (data.assets?.video || data.video?.url) : null
  });
}
