# 🚀 Google Gemini Pro & Veo Integration Guide

## ✨ What's New?

Your AI Media Generator Pro now supports **Google's latest AI models**:

- **🎨 Gemini Pro (Imagen 3)** - Advanced image generation with Google's state-of-the-art model
- **🎬 Google Veo** - Professional video generation from text or images
- **✨ Gemini Bhindi** - FREE image generation (no API key needed!)

## 🎯 Three Image Generation Options

### 1. ✨ Gemini Bhindi (FREE)
- **Cost**: $0 (FREE!)
- **Quality**: High
- **Speed**: 10-30 seconds
- **API Key**: Not required (uses Bhindi)
- **Best For**: Most use cases, unlimited generation

### 2. 🚀 Gemini Pro (Imagen 3)
- **Cost**: Pay-per-use (Google Cloud pricing)
- **Quality**: Very High (state-of-the-art)
- **Speed**: 15-40 seconds
- **API Key**: Google API key required
- **Best For**: Professional projects, highest quality needs

### 3. 🎨 DALL-E 3
- **Cost**: ~$0.08 per image
- **Quality**: Very High
- **Speed**: 20-40 seconds
- **API Key**: OpenAI key required
- **Best For**: Alternative premium option

## 🎬 Video Generation Options

### 1. 🎬 Google Veo (NEW!)
- **Cost**: Pay-per-use (Google Cloud pricing)
- **Quality**: Professional-grade
- **Speed**: 30-120 seconds
- **Features**: Text-to-video & Image-to-video
- **API Key**: Google API key required
- **Best For**: High-quality video content

### 2. 🎥 Runway Gen-3
- **Cost**: ~$0.05-0.10 per video
- **Quality**: High
- **Best For**: Fast video generation

### 3. 🎞️ Stability AI
- **Cost**: ~10 credits per video
- **Quality**: Good
- **Best For**: Image-to-video animations

### 4. 🌟 Luma Dream Machine
- **Cost**: Subscription-based
- **Quality**: High
- **Best For**: Advanced video effects

## 📋 Setup Instructions

### Step 1: Get Your Google API Key

1. **Visit Google AI Studio**
   - Go to: https://makersuite.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Select or create a Google Cloud project
   - Copy your API key

3. **Enable Required APIs** (in Google Cloud Console)
   - Go to: https://console.cloud.google.com/apis/library
   - Enable "Generative Language API"
   - Enable "Vertex AI API" (for Imagen 3 and Veo)

### Step 2: Add API Key to Your App

#### Option A: Through Settings UI (Recommended)
1. Open your deployed app
2. Click "API Settings" button (top right)
3. Paste your Google API key in the "Google API Key" field
4. Click "Save API Keys"

#### Option B: Environment Variables (For Deployment)
1. Create `.env.local` file in project root:
```bash
GOOGLE_API_KEY=your-google-api-key-here
```

2. For Vercel deployment:
   - Go to Vercel project settings
   - Navigate to "Environment Variables"
   - Add `GOOGLE_API_KEY` with your key
   - Redeploy

### Step 3: Start Creating!

#### For Images:
1. Select "Image Generation" mode
2. Choose provider:
   - **✨ Gemini (Free)** - No key needed
   - **🚀 Gemini Pro** - Uses your Google key
   - **DALL-E 3** - Uses OpenAI key
3. Select aspect ratio (for Gemini)
4. Enter your prompt
5. Click "Generate Image"

#### For Videos:
1. Select "Text-to-Video" or "Image-to-Video" mode
2. Choose model:
   - **🎬 Google Veo** - Uses your Google key
   - **Runway/Stability/Luma** - Uses respective keys
3. Enter your prompt (and upload image if image-to-video)
4. Click "Generate Video"

## 🎨 Image Generation Examples

### Gemini Pro (Imagen 3) Prompts

#### Photography
```
A professional product photo of a luxury smartwatch on a marble surface,
studio lighting, reflections, high detail, 8K quality, commercial photography
```

#### Art & Illustration
```
A vibrant digital illustration of a futuristic city at sunset,
neon lights, flying cars, cyberpunk aesthetic, highly detailed,
concept art style
```

#### Marketing
```
Modern minimalist Instagram post design for a tech startup,
gradient background, clean typography, professional branding,
16:9 aspect ratio
```

#### Nature & Landscapes
```
A breathtaking mountain landscape at golden hour, misty valleys,
dramatic clouds, photorealistic, National Geographic style,
ultra-high resolution
```

## 🎬 Video Generation Examples

### Google Veo Prompts

#### Text-to-Video
```
A butterfly with iridescent wings flying through a magical forest,
sunlight filtering through trees, slow motion, cinematic lighting,
professional color grading
```

#### Image-to-Video
```
Upload: [Your product image]
Prompt: Slow 360-degree rotation with dramatic lighting,
professional product showcase, smooth camera movement
```

#### Cinematic Scenes
```
A drone shot flying over a coastal city at sunset,
golden hour lighting, smooth camera movement,
establishing shot, cinematic composition
```

## 💰 Cost Comparison

### Image Generation

| Provider | Cost per Image | Quality | Speed | API Key |
|----------|---------------|---------|-------|---------|
| **Gemini Bhindi** | **FREE** ✅ | High | 10-30s | Not needed |
| **Gemini Pro** | ~$0.02-0.05 | Very High | 15-40s | Google |
| **DALL-E 3** | ~$0.08 | Very High | 20-40s | OpenAI |

### Video Generation

| Provider | Cost per Video | Quality | Speed | API Key |
|----------|---------------|---------|-------|---------|
| **Google Veo** | ~$0.10-0.20 | Professional | 30-120s | Google |
| **Runway** | ~$0.05-0.10 | High | 30-90s | Runway |
| **Stability** | ~10 credits | Good | 60-120s | Stability |
| **Luma** | Subscription | High | 60-120s | Luma |

## 🔧 Technical Details

### Gemini Pro (Imagen 3) Features
- **Aspect Ratios**: 1:1, 16:9, 4:3, 3:4, 9:16
- **Resolution**: Up to 4K
- **Safety Filters**: Built-in content moderation
- **Person Generation**: Configurable
- **Output Format**: PNG (base64 encoded)

### Google Veo Features
- **Duration**: 5 seconds (configurable)
- **Aspect Ratio**: 16:9 (default)
- **Resolution**: HD (1080p)
- **Input**: Text prompt or image + prompt
- **Output Format**: MP4 (base64 encoded)
- **Processing**: Asynchronous with polling

## 🐛 Troubleshooting

### "Google API key is required"
**Solution**: 
1. Click "API Settings"
2. Add your Google API key
3. Click "Save API Keys"
4. Try generating again

### "Failed to generate image/video"
**Possible Causes**:
1. **Invalid API Key**: Check your key is correct
2. **API Not Enabled**: Enable required APIs in Google Cloud Console
3. **Quota Exceeded**: Check your Google Cloud quota
4. **Invalid Prompt**: Try a different, more specific prompt

**Steps to Fix**:
1. Verify API key at: https://makersuite.google.com/app/apikey
2. Check enabled APIs at: https://console.cloud.google.com/apis/library
3. Review quota at: https://console.cloud.google.com/iam-admin/quotas
4. Try a simpler prompt first

### "Video generation timed out"
**Solution**:
- Veo videos can take 30-120 seconds
- The app polls for 5 minutes max
- Try a simpler prompt if timeout persists
- Check Google Cloud Console for any errors

### API Quota Issues
**Solution**:
1. Go to: https://console.cloud.google.com/iam-admin/quotas
2. Search for "Generative Language API"
3. Request quota increase if needed
4. Consider using Gemini Bhindi (FREE) as alternative

## 🎯 Best Practices

### For Image Generation
1. **Be Specific**: Detailed prompts = better results
2. **Include Style**: Mention art style, lighting, mood
3. **Use Keywords**: "professional", "high quality", "detailed"
4. **Choose Right Ratio**: Match your use case
   - 1:1 - Instagram posts, profile pictures
   - 16:9 - YouTube thumbnails, presentations
   - 4:3 - Traditional photos
   - 3:4 - Pinterest, mobile wallpapers
   - 9:16 - Instagram stories, TikTok

### For Video Generation
1. **Start Simple**: Test with basic prompts first
2. **Describe Motion**: Specify camera movement, subject action
3. **Set the Scene**: Lighting, environment, atmosphere
4. **Be Patient**: Videos take longer than images
5. **Use Image-to-Video**: For more control over composition

## 🔐 Security & Privacy

### API Key Storage
- **Client-Side**: Keys stored in browser localStorage
- **Never Shared**: Keys never sent to our servers
- **Direct API Calls**: Your browser calls Google directly
- **Your Control**: Delete keys anytime from settings

### Data Privacy
- **No Storage**: We don't store your prompts or generated media
- **Direct Integration**: All API calls go directly to Google
- **Your Account**: All usage tracked in your Google Cloud account
- **Full Control**: Manage everything from Google Cloud Console

## 📊 Monitoring Usage

### Track Your Costs
1. Go to: https://console.cloud.google.com/billing
2. View detailed usage reports
3. Set up budget alerts
4. Monitor API calls in real-time

### Usage Limits
- Set daily/monthly spending limits
- Configure quota alerts
- Review usage patterns
- Optimize based on needs

## 🚀 Advanced Features

### Gemini Pro Advanced Options
```typescript
// In the API route, you can customize:
{
  safetySetting: 'block_some', // or 'block_few', 'block_most'
  personGeneration: 'allow_adult', // or 'dont_allow'
  sampleCount: 1, // Number of images to generate
}
```

### Veo Advanced Options
```typescript
// In the API route, you can customize:
{
  durationSeconds: 5, // Video duration
  aspectRatio: '16:9', // or '1:1', '9:16'
  // More options coming soon!
}
```

## 🔗 Useful Links

- **Google AI Studio**: https://makersuite.google.com
- **Google Cloud Console**: https://console.cloud.google.com
- **Imagen 3 Docs**: https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview
- **Veo Docs**: https://cloud.google.com/vertex-ai/docs/generative-ai/video/overview
- **Pricing**: https://cloud.google.com/vertex-ai/pricing
- **API Reference**: https://cloud.google.com/vertex-ai/docs/reference

## 💬 Support

Need help?
- **GitHub Issues**: [Report bugs](https://github.com/iakash07/ai-media-generator-pro/issues)
- **Google Cloud Support**: https://cloud.google.com/support
- **Community**: Join our Discord (coming soon!)

## 🎉 What's Next?

Coming soon:
- [ ] Batch generation
- [ ] Custom video durations
- [ ] More aspect ratios
- [ ] Advanced editing features
- [ ] Generation history
- [ ] Favorites & collections

---

**Happy Creating with Google Gemini Pro & Veo! 🎨🎬**

**Start with FREE Gemini Bhindi, upgrade to Pro when you need it!**
