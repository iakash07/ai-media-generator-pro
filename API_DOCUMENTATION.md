# 🔌 API Integration Documentation

Complete guide for all API integrations in AI Media Generator Pro.

## 📋 Table of Contents
- [OpenAI DALL-E 3](#openai-dall-e-3)
- [Runway Gen-3](#runway-gen-3)
- [Stability AI](#stability-ai)
- [Luma AI](#luma-ai)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)

---

## 🎨 OpenAI DALL-E 3

### Image Generation

**Endpoint**: `https://api.openai.com/v1/images/generations`

**Method**: POST

**Headers**:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_OPENAI_API_KEY"
}
```

**Request Body**:
```json
{
  "model": "dall-e-3",
  "prompt": "A serene mountain landscape at sunset",
  "n": 1,
  "size": "1024x1024",
  "quality": "hd",
  "style": "vivid"
}
```

**Parameters**:
- `model`: "dall-e-3" (required)
- `prompt`: Text description (required, max 4000 chars)
- `n`: Number of images (1 for DALL-E 3)
- `size`: "1024x1024", "1792x1024", or "1024x1792"
- `quality`: "standard" or "hd"
- `style`: "vivid" or "natural"

**Response**:
```json
{
  "created": 1234567890,
  "data": [
    {
      "url": "https://...",
      "revised_prompt": "Enhanced prompt by DALL-E"
    }
  ]
}
```

### Image Editing

**Endpoint**: `https://api.openai.com/v1/images/edits`

**Method**: POST

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_OPENAI_API_KEY"
}
```

**Request Body** (FormData):
- `image`: PNG file (required, must be square, <4MB)
- `prompt`: Editing instructions (required)
- `n`: Number of images (1)
- `size`: Output size

**Important Notes**:
- Image must be square and have transparency
- Max file size: 4MB
- Supported format: PNG only

---

## 🎬 Runway Gen-3

### Text-to-Video / Image-to-Video

**Endpoint**: `https://api.runwayml.com/v1/image_to_video`

**Method**: POST

**Headers**:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_RUNWAY_API_KEY",
  "X-Runway-Version": "2024-11-06"
}
```

**Request Body**:
```json
{
  "promptText": "A butterfly flying through a magical forest",
  "model": "gen3a_turbo",
  "duration": 5,
  "ratio": "16:9",
  "promptImage": "base64_or_url" // Optional for image-to-video
}
```

**Parameters**:
- `promptText`: Video description (required)
- `model`: "gen3a_turbo" (fastest) or "gen3a" (higher quality)
- `duration`: 5 or 10 seconds
- `ratio`: "16:9", "9:16", or "1:1"
- `promptImage`: Base64 or URL (optional)

**Response**:
```json
{
  "id": "task_id_here",
  "status": "PENDING"
}
```

### Check Status

**Endpoint**: `https://api.runwayml.com/v1/tasks/{task_id}`

**Method**: GET

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_RUNWAY_API_KEY",
  "X-Runway-Version": "2024-11-06"
}
```

**Response**:
```json
{
  "id": "task_id",
  "status": "SUCCEEDED",
  "output": ["https://video_url.mp4"]
}
```

**Status Values**:
- `PENDING`: Processing
- `RUNNING`: In progress
- `SUCCEEDED`: Complete
- `FAILED`: Error occurred

**Polling**:
- Poll every 5 seconds
- Timeout after 5 minutes
- Average generation time: 30-90 seconds

---

## 🎥 Stability AI

### Image-to-Video

**Endpoint**: `https://api.stability.ai/v2beta/image-to-video`

**Method**: POST

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_STABILITY_API_KEY"
}
```

**Request Body** (FormData):
- `image`: Image file (required)
- `seed`: Random seed (0-4294967294)
- `cfg_scale`: Motion strength (0-10, default 1.8)
- `motion_bucket_id`: Motion amount (1-255, default 127)

**Response**:
```json
{
  "id": "generation_id_here"
}
```

### Get Result

**Endpoint**: `https://api.stability.ai/v2beta/image-to-video/result/{generation_id}`

**Method**: GET

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_STABILITY_API_KEY",
  "Accept": "video/*"
}
```

**Response**:
- Status 202: Still processing
- Status 200: Video blob (download directly)

**Polling**:
- Poll every 10 seconds
- Timeout after 10 minutes
- Average generation time: 60-180 seconds

**Important Notes**:
- Only supports image-to-video (no text-to-video)
- Requires a source image
- Output is MP4 video blob

---

## 🌟 Luma AI

### Text-to-Video / Image-to-Video

**Endpoint**: `https://api.lumalabs.ai/dream-machine/v1/generations`

**Method**: POST

**Headers**:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_LUMA_API_KEY"
}
```

**Request Body** (Text-to-Video):
```json
{
  "prompt": "A cinematic shot of a sunset over the ocean",
  "aspect_ratio": "16:9",
  "loop": false
}
```

**Request Body** (Image-to-Video):
```json
{
  "prompt": "Camera zooms in slowly",
  "aspect_ratio": "16:9",
  "loop": false,
  "keyframes": {
    "frame0": {
      "type": "image",
      "url": "https://image_url_or_base64"
    }
  }
}
```

**Parameters**:
- `prompt`: Description (required)
- `aspect_ratio`: "16:9", "9:16", "4:3", "3:4", "21:9", "9:21", "1:1"
- `loop`: true/false (create seamless loop)
- `keyframes`: Optional starting image

**Response**:
```json
{
  "id": "generation_id",
  "state": "queued"
}
```

### Check Status

**Endpoint**: `https://api.lumalabs.ai/dream-machine/v1/generations/{generation_id}`

**Method**: GET

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_LUMA_API_KEY"
}
```

**Response**:
```json
{
  "id": "generation_id",
  "state": "completed",
  "assets": {
    "video": "https://video_url.mp4"
  }
}
```

**State Values**:
- `queued`: Waiting to start
- `dreaming`: Processing
- `completed`: Done
- `failed`: Error

**Polling**:
- Poll every 5 seconds
- Timeout after 10 minutes
- Average generation time: 60-120 seconds

---

## ⚠️ Error Handling

### Common Error Codes

**OpenAI**:
- `401`: Invalid API key
- `429`: Rate limit exceeded
- `400`: Invalid request (check prompt/parameters)
- `500`: Server error

**Runway**:
- `401`: Authentication failed
- `402`: Insufficient credits
- `400`: Invalid parameters
- `500`: Generation failed

**Stability AI**:
- `401`: Invalid API key
- `402`: Insufficient credits
- `400`: Invalid image format
- `500`: Processing error

**Luma AI**:
- `401`: Invalid API key
- `429`: Rate limit
- `400`: Invalid request
- `500`: Generation failed

### Error Response Format

```typescript
try {
  const response = await fetch(endpoint, options);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || errorData.message || 'API Error');
  }
  
  const data = await response.json();
  // Process data
} catch (error) {
  console.error('API Error:', error.message);
  // Show user-friendly error
}
```

---

## 📊 Rate Limits

### OpenAI DALL-E 3
- **Free Tier**: 5 images/minute
- **Tier 1**: 7 images/minute
- **Tier 2**: 7 images/minute
- **Tier 3**: 7 images/minute
- **Tier 4**: 15 images/minute
- **Tier 5**: 50 images/minute

### Runway Gen-3
- Depends on subscription plan
- Turbo: Faster generation, more credits
- Standard: Slower, fewer credits
- Check dashboard for current limits

### Stability AI
- **Free**: 25 credits/month
- **Starter**: 3,000 credits/month
- **Professional**: 10,000 credits/month
- Image-to-video: ~10 credits per generation

### Luma AI
- Depends on subscription
- Free tier: Limited generations
- Pro: More generations + priority queue
- Check account for current quota

---

## 🔐 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** in production
3. **Implement rate limiting** on your end
4. **Validate user input** before API calls
5. **Handle errors gracefully** with user feedback
6. **Monitor API usage** to avoid unexpected costs
7. **Rotate keys regularly** for security
8. **Use HTTPS only** for API calls

---

## 💡 Tips & Tricks

### DALL-E 3
- Be specific in prompts for better results
- Use "HD" quality for best output
- "Vivid" style = more dramatic, "Natural" = more realistic
- DALL-E often enhances your prompt (check revised_prompt)

### Runway Gen-3
- Use "gen3a_turbo" for faster results
- Provide clear motion descriptions
- Image-to-video works best with clear subjects
- Keep prompts concise but descriptive

### Stability AI
- Higher cfg_scale = more motion
- motion_bucket_id controls animation intensity
- Works best with images that have clear subjects
- Requires square or near-square images

### Luma AI
- Most flexible with aspect ratios
- Great for cinematic shots
- Loop option creates seamless videos
- Supports both text and image inputs

---

## 📞 Support & Resources

- **OpenAI**: https://platform.openai.com/docs
- **Runway**: https://docs.runwayml.com
- **Stability AI**: https://platform.stability.ai/docs
- **Luma AI**: https://docs.lumalabs.ai

---

**Last Updated**: January 2026
**Version**: 1.0.0
