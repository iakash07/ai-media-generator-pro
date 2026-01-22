# 🎨 Bhindi Integration Guide

## Overview

This app uses **Bhindi's AI agents** as automatic fallbacks when premium API keys are not configured. This provides a **free tier** option for users without requiring any API keys!

## 🚀 How It Works

### Automatic Fallback System

```
User Request
    ↓
Check for API Keys
    ↓
┌─────────────────────┬──────────────────────┐
│  Premium Keys Found │  No Keys Found       │
│  (OpenAI, Runway)   │  (Free Tier)         │
├─────────────────────┼──────────────────────┤
│  Use Premium APIs   │  Use Bhindi Agents   │
│  - DALL-E 3         │  - Gemini Nano Pro   │
│  - Runway Gen-3     │  - Bhindi Video      │
│  - Stability AI     │  (Automatic)         │
│  - Luma AI          │                      │
└─────────────────────┴──────────────────────┘
```

## 🎯 Bhindi Agents Used

### 1. Image Generation
**Agent**: `gemini-nano-banana-pro`

**Features**:
- ✅ High-quality image generation
- ✅ Multiple aspect ratios (1:1, 16:9, 9:16)
- ✅ Advanced text rendering
- ✅ Search grounding for accuracy
- ✅ Up to 4K resolution

**API Endpoint**:
```typescript
POST https://api.bhindi.io/v1/image/generate
{
  "prompt": "A beautiful sunset",
  "aspectRatio": "16:9",
  "model": "gemini-nano-banana-pro"
}
```

**Response**:
```json
{
  "imageUrl": "https://...",
  "model": "gemini-nano-banana-pro"
}
```

### 2. Video Generation (Coming Soon)
**Agents**: Multiple video generation agents available

**Features**:
- Text-to-video generation
- Image-to-video animation
- Multiple styles and models
- Professional quality output

## 🔧 Configuration

### Option 1: No Configuration (Free Tier)
Just deploy and use! Bhindi fallback works automatically.

```bash
# No environment variables needed
# App uses Bhindi's free tier automatically
```

### Option 2: With Bhindi API Key (Higher Limits)
Get a Bhindi API key for higher rate limits:

```bash
# .env.local or Vercel environment variables
BHINDI_API_KEY=your-bhindi-api-key
BHINDI_API_URL=https://api.bhindi.io  # Optional, defaults to this
```

### Option 3: Premium APIs (Best Quality)
Add premium API keys for best quality:

```bash
# Premium providers
OPENAI_API_KEY=sk-your-openai-key
RUNWAY_API_KEY=your-runway-key
STABILITY_API_KEY=sk-your-stability-key
LUMA_API_KEY=your-luma-key

# Bhindi as fallback (optional)
BHINDI_API_KEY=your-bhindi-key
```

## 📊 Quality Comparison

| Provider | Quality | Speed | Cost | Use Case |
|----------|---------|-------|------|----------|
| **DALL-E 3** | ⭐⭐⭐⭐⭐ | Fast | $0.08/img | Production |
| **Gemini Nano Pro** | ⭐⭐⭐⭐ | Fast | Free* | Testing/Free tier |
| **Runway Gen-3** | ⭐⭐⭐⭐⭐ | Medium | $0.05-0.10/video | Production |
| **Bhindi Video** | ⭐⭐⭐⭐ | Medium | Free* | Testing/Free tier |

*Free tier has rate limits. Add Bhindi API key for higher limits.

## 🎯 Implementation Details

### Image Generation Flow

```typescript
// 1. Try OpenAI first
const response = await fetch('/api/generate-image', {
  method: 'POST',
  body: JSON.stringify({ prompt, size, style })
});

// 2. If OpenAI fails (no key), automatic fallback
if (!response.ok && error.includes('not configured')) {
  // Automatically tries Bhindi
  const fallback = await fetch('/api/generate-image-bhindi', {
    method: 'POST',
    body: JSON.stringify({ prompt, size, style })
  });
}
```

### Video Generation Flow

```typescript
// 1. Check for provider API keys
const hasRunwayKey = !!process.env.RUNWAY_API_KEY;
const hasStabilityKey = !!process.env.STABILITY_API_KEY;
const hasLumaKey = !!process.env.LUMA_API_KEY;

// 2. If no keys, use Bhindi automatically
if (!hasRunwayKey && !hasStabilityKey && !hasLumaKey) {
  return await generateBhindiVideo(prompt, model, imageData);
}

// 3. If specific provider key missing, use Bhindi for that provider
if (model === 'runway' && !hasRunwayKey) {
  return await generateBhindiVideo(prompt, 'runway', imageData);
}
```

## 🔒 Security

### API Key Storage
- ✅ All keys stored server-side only
- ✅ Never exposed to client
- ✅ Environment variables
- ✅ Secure transmission

### Bhindi Integration
- ✅ Optional API key for higher limits
- ✅ Works without key (free tier)
- ✅ Automatic rate limiting
- ✅ Error handling

## 📈 Rate Limits

### Without Bhindi API Key (Free Tier)
- **Images**: Limited requests per day
- **Videos**: Limited requests per day
- **Shared**: Across all free tier users

### With Bhindi API Key
- **Images**: Higher limits based on plan
- **Videos**: Higher limits based on plan
- **Dedicated**: Your own quota

### With Premium API Keys
- **Images**: Based on OpenAI billing
- **Videos**: Based on provider billing
- **Unlimited**: Pay per use

## 🎨 Customization

### Aspect Ratios
```typescript
// Supported aspect ratios
const aspectRatios = {
  '1024x1024': '1:1',   // Square
  '1792x1024': '16:9',  // Landscape
  '1024x1792': '9:16',  // Portrait
  '1024x1536': '4:3',   // Standard
  '1536x1024': '3:4'    // Standard portrait
};
```

### Image Styles
```typescript
// Map OpenAI styles to Bhindi
const styleMapping = {
  'vivid': 'vibrant',
  'natural': 'realistic'
};
```

## 🚀 Getting Started

### 1. Deploy Without Any Keys
```bash
git clone https://github.com/iakash07/ai-media-generator-pro.git
cd ai-media-generator-pro
npm install
npm run dev
```

**Result**: Works immediately with Bhindi free tier! ✅

### 2. Add Bhindi API Key (Optional)
```bash
# Get key from Bhindi dashboard
echo "BHINDI_API_KEY=your-key" >> .env.local
npm run dev
```

**Result**: Higher rate limits! ✅

### 3. Add Premium Keys (Optional)
```bash
# Add premium providers
echo "OPENAI_API_KEY=sk-your-key" >> .env.local
echo "RUNWAY_API_KEY=your-key" >> .env.local
npm run dev
```

**Result**: Best quality! ✅

## 📊 Cost Analysis

### Scenario 1: Free Tier Only
```
Users: 100
Generations: 1000 images + 200 videos
Cost: $0/month (within free tier limits)
Quality: ⭐⭐⭐⭐
```

### Scenario 2: Bhindi API Key
```
Users: 1000
Generations: 10,000 images + 2000 videos
Cost: ~$50-100/month (Bhindi pricing)
Quality: ⭐⭐⭐⭐
```

### Scenario 3: Premium APIs
```
Users: 10,000
Generations: 100,000 images + 20,000 videos
Cost: ~$8,000-10,000/month
Quality: ⭐⭐⭐⭐⭐
```

### Scenario 4: Hybrid (Recommended)
```
Users: 1000
Images: OpenAI (10,000) = $800
Videos: Bhindi (2000) = $0-50
Total: ~$800-850/month
Quality: Images ⭐⭐⭐⭐⭐, Videos ⭐⭐⭐⭐
```

## 🔍 Monitoring

### Check Which Provider is Being Used

```typescript
// Response includes provider info
{
  "data": [{
    "url": "https://...",
    "revised_prompt": "..."
  }],
  "provider": "bhindi",  // or "openai"
  "model": "gemini-nano-banana-pro"
}
```

### Log Provider Usage

```typescript
// Server-side logging
console.log(`Image generated using: ${provider}`);
console.log(`Model: ${model}`);
console.log(`Cost: ${provider === 'bhindi' ? 'Free' : 'Paid'}`);
```

## 🆘 Troubleshooting

### Bhindi Fallback Not Working?

**Check 1: Latest Code**
```bash
git pull origin main
npm install
```

**Check 2: API Endpoint**
```bash
# Default: https://api.bhindi.io
# Can override with BHINDI_API_URL
```

**Check 3: Response Format**
```typescript
// Bhindi response should have:
{
  "imageUrl": "https://...",
  // or
  "url": "https://...",
  // or
  "data": { "url": "https://..." }
}
```

### Rate Limit Errors?

**Solution 1: Add Bhindi API Key**
```bash
BHINDI_API_KEY=your-key
```

**Solution 2: Add Premium Keys**
```bash
OPENAI_API_KEY=sk-your-key
```

**Solution 3: Implement Caching**
```typescript
// Cache generated images
// Reduce duplicate requests
```

## 📚 API Reference

### Generate Image (Bhindi)
```typescript
POST /api/generate-image-bhindi

Request:
{
  "prompt": string,
  "size": "1024x1024" | "1792x1024" | "1024x1792",
  "style": "vivid" | "natural"
}

Response:
{
  "data": [{
    "url": string,
    "revised_prompt": string
  }],
  "provider": "bhindi",
  "model": "gemini-nano-banana-pro"
}
```

### Generate Video (Bhindi)
```typescript
POST /api/generate-video-bhindi

Request:
{
  "prompt": string,
  "model": "runway" | "stability" | "luma",
  "imageData": string | null
}

Response:
{
  "taskId": string,
  "provider": "bhindi",
  "message": string,
  "estimatedTime": string
}
```

### Check Video Status (Bhindi)
```typescript
POST /api/check-video-status-bhindi

Request:
{
  "taskId": string
}

Response:
{
  "status": "PROCESSING" | "SUCCEEDED" | "FAILED",
  "videoUrl": string | null,
  "progress": number,
  "message": string
}
```

## 🎉 Benefits

### For Users
- ✅ No API keys required
- ✅ Works immediately
- ✅ Free tier available
- ✅ Good quality
- ✅ Fast generation

### For Developers
- ✅ Easy integration
- ✅ Automatic fallback
- ✅ Cost control
- ✅ Flexible pricing
- ✅ Production ready

### For Business
- ✅ Start free
- ✅ Scale gradually
- ✅ Control costs
- ✅ Monitor usage
- ✅ Happy users

## 🚀 Next Steps

1. **Deploy**: Use Bhindi fallback immediately
2. **Test**: Generate images and videos
3. **Monitor**: Check usage and quality
4. **Scale**: Add API keys as needed
5. **Optimize**: Mix providers for best value

## 📞 Support

- **Bhindi Docs**: https://docs.bhindi.io
- **API Reference**: https://api.bhindi.io/docs
- **GitHub Issues**: Report integration issues
- **Community**: Join Bhindi community

---

**Built with ❤️ using Bhindi AI Agents**

**🎨 Start creating for free today!**
