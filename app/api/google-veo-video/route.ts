import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageUrl, apiKey } = await request.json();

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

    // Prepare request body
    const requestBody: any = {
      instances: [
        {
          prompt: prompt,
        },
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio: '16:9',
        durationSeconds: 5,
      },
    };

    // Add image if provided (for image-to-video)
    if (imageUrl) {
      // If it's a base64 data URL, extract the base64 part
      let imageBase64 = imageUrl;
      if (imageUrl.startsWith('data:')) {
        imageBase64 = imageUrl.split(',')[1];
      } else {
        // If it's a URL, fetch and convert to base64
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        imageBase64 = Buffer.from(imageBuffer).toString('base64');
      }
      
      requestBody.instances[0].image = {
        bytesBase64Encoded: imageBase64,
      };
    }

    // Call Google Veo API for video generation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/veo-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Google Veo API error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to generate video with Google Veo');
    }

    const data = await response.json();

    // Extract video from response
    const predictions = data.predictions || [];
    if (predictions.length === 0) {
      throw new Error('No video generated');
    }

    // Check if video is ready or needs polling
    const prediction = predictions[0];
    
    if (prediction.bytesBase64Encoded) {
      // Video is ready immediately
      const videoBase64 = prediction.bytesBase64Encoded;
      const videoUrl = `data:video/mp4;base64,${videoBase64}`;
      
      return NextResponse.json({
        videoUrl,
        success: true,
        status: 'completed',
        provider: 'google-veo',
      });
    } else if (prediction.operationName) {
      // Video generation is in progress, return operation ID for polling
      return NextResponse.json({
        operationId: prediction.operationName,
        success: true,
        status: 'processing',
        provider: 'google-veo',
      });
    } else {
      throw new Error('Unexpected response format from Google Veo');
    }
  } catch (error: any) {
    console.error('Google Veo video generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate video' },
      { status: 500 }
    );
  }
}
