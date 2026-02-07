import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { operationId, apiKey } = await request.json();

    if (!operationId) {
      return NextResponse.json(
        { error: 'Operation ID is required' },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key is required' },
        { status: 400 }
      );
    }

    // Check operation status
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${operationId}?key=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Google Veo status check error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to check video status');
    }

    const data = await response.json();

    // Check if operation is complete
    if (data.done) {
      // Operation completed
      if (data.error) {
        return NextResponse.json({
          status: 'failed',
          error: data.error.message || 'Video generation failed',
        });
      }

      // Extract video from response
      const result = data.response;
      if (result && result.predictions && result.predictions.length > 0) {
        const prediction = result.predictions[0];
        
        if (prediction.bytesBase64Encoded) {
          const videoBase64 = prediction.bytesBase64Encoded;
          const videoUrl = `data:video/mp4;base64,${videoBase64}`;
          
          return NextResponse.json({
            status: 'completed',
            videoUrl,
            success: true,
          });
        }
      }

      return NextResponse.json({
        status: 'failed',
        error: 'No video in completed operation',
      });
    } else {
      // Operation still in progress
      return NextResponse.json({
        status: 'processing',
        progress: data.metadata?.progressPercent || 0,
      });
    }
  } catch (error: any) {
    console.error('Google Veo status check error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check video status' },
      { status: 500 }
    );
  }
}
