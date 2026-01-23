# 🎨 AI Media Generator Pro

A professional-grade AI media generation platform with **automatic fallback system** - works with or without API keys! Supports **DALL-E 3** for images and **Runway Gen-3**, **Stability AI**, and **Luma AI** for videos.

![AI Media Generator](https://img.shields.io/badge/AI-Media%20Generator-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Key Features

### 🎯 **Works With or Without API Keys!**
- ✅ **With API Keys**: Premium quality (DALL-E 3, Runway, etc.)
- ✅ **Without API Keys**: Free tier with Bhindi fallback
- ✅ **Automatic Fallback**: Seamlessly switches when keys not configured
- ✅ **No Configuration**: Users can start creating immediately

### 🖼️ Image Generation
- **DALL-E 3** (with OpenAI key) - HD quality, vivid/natural styles
- **Bhindi Gemini** (automatic fallback) - Good quality, free tier
- Multiple sizes: 1024x1024, 1792x1024, 1024x1792
- Revised prompt display

### 🎬 Video Generation
- **Runway Gen-3 Turbo** - Text-to-video & Image-to-video
- **Stability AI** - Image-to-video animations
- **Luma AI Dream Machine** - Advanced video generation
- **Bhindi Video** (automatic fallback) - Free tier for all models
- 5-second video duration, 16:9 aspect ratio

### 🎯 Generation Modes
1. **Image Generation** - Create stunning images from text
2. **Text-to-Video** - Generate videos from descriptions
3. **Image-to-Video** - Animate your images

## 🚀 Quick Start

### For Users (No Setup Required!)

Just visit the deployed site and start creating:
1. Enter your prompt
2. Choose settings
3. Click Generate
4. Download your creation!

**No API keys, no configuration, no friction!**

### For Developers (Deploy Your Own)

#### 1. Clone the repository
```bash
git clone https://github.com/iakash07/ai-media-generator-pro.git
cd ai-media-generator-pro
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. (Optional) Set up API keys for premium quality
Create `.env.local` file:
```bash
# Optional - for premium quality
OPENAI_API_KEY=sk-your-openai-key
RUNWAY_API_KEY=your-runway-key
STABILITY_API_KEY=sk-your-stability-key
LUMA_API_KEY=your-luma-key

# If not provided, app uses free Bhindi fallback automatically!
```

#### 4. Run development server
```bash
npm run dev
```

#### 5. Open browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys (Optional)

### For Premium Quality (Optional)
- **OpenAI**: https://platform.openai.com (for HD images)
- **Runway**: https://runwayml.com (for premium videos)
- **Stability AI**: https://stability.ai (for image-to-video)
- **Luma AI**: https://lumalabs.ai (for advanced videos)

### For Free Tier (No Keys Needed)
- **Bhindi**: Automatic fallback, no configuration required!

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iakash07/ai-media-generator-pro)

1. Click the button above
2. **(Optional)** Add API keys for premium quality
3. Deploy!

**Works immediately even without API keys!**

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📖 How It Works

### Architecture with Automatic Fallback

```
User Request
    ↓
Check API Keys
    ↓
┌─────────────────┬─────────────────┐
│  Keys Found     │  No Keys Found  │
│  (Premium)      │  (Free Tier)    │
├─────────────────┼─────────────────┤
│ OpenAI/Runway   │ Bhindi Fallback │
│ Stability/Luma  │ (Automatic)     │
└─────────────────┴─────────────────┘
    ↓                    ↓
  Result              Result
```

### API Routes

**Image Generation**:
1. `/api/generate-image` - Tries OpenAI DALL-E 3
2. `/api/generate-image-bhindi` - Bhindi fallback (automatic)

**Video Generation**:
1. `/api/generate-video` - Tries Runway/Stability/Luma
2. `/api/generate-video-bhindi` - Bhindi fallback (automatic)

**Status Checking**:
1. `/api/check-video-status` - Checks all providers
2. `/api/check-video-status-bhindi` - Bhindi status

### Security

- ✅ API keys stored server-side only
- ✅ Never exposed to client
- ✅ Secure environment variables
- ✅ Automatic fallback when keys missing

## 🎨 Usage Examples

### Generate an Image
```
Prompt: "A majestic dragon flying over a medieval castle at sunset"
Style: Vivid
Size: 1024x1024
→ Click Generate → Wait 10-30 seconds → Download!

With OpenAI key: HD quality, DALL-E 3
Without key: Good quality, Bhindi Gemini (automatic)
```

### Create a Video
```
Mode: Text-to-Video
Model: Runway
Prompt: "A butterfly flying through a magical forest"
→ Click Generate → Wait 30-120 seconds → Watch & Download!

With Runway key: Premium quality
Without key: Good quality, Bhindi fallback (automatic)
```

### Animate an Image
```
Mode: Image-to-Video
Upload: Your image
Prompt: "Camera zooms in slowly"
Model: Luma
→ Click Generate → Wait 60-120 seconds → Download!

With Luma key: Premium quality
Without key: Good quality, Bhindi fallback (automatic)
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Integration**: Server-side routes with automatic fallback
- **AI APIs**:
  - OpenAI DALL-E 3 (optional)
  - Runway Gen-3 Turbo (optional)
  - Stability AI Image-to-Video (optional)
  - Luma AI Dream Machine (optional)
  - Bhindi AI (automatic fallback)

## 📁 Project Structure

```
ai-media-generator-pro/
├── app/
│   ├── api/                           # Server-side API routes
│   │   ├── generate-image/            # OpenAI image generation
│   │   ├── generate-image-bhindi/     # Bhindi image fallback
│   │   ├── generate-video/            # Video generation (all providers)
│   │   ├── generate-video-bhindi/     # Bhindi video fallback
│   │   ├── check-video-status/        # Status checking (all)
│   │   └── check-video-status-bhindi/ # Bhindi status checking
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Home page
│   └── globals.css                    # Global styles
├── components/
│   ├── AIMediaGenerator.tsx           # Client-side keys version
│   └── AIMediaGeneratorServerless.tsx # Server-side version (active)
├── public/                            # Static assets
├── .env.local.example                 # Environment variables template
├── README.md                          # This file
├── SETUP_FIX.md                       # Image generation fix guide
├── VIDEO_SETUP_FIX.md                 # Video generation fix guide
├── DEPLOYMENT.md                      # Deployment guide
├── API_DOCUMENTATION.md               # API details
├── QUICKSTART.md                      # Quick start guide
├── TROUBLESHOOTING.md                 # Problem solutions
└── package.json                       # Dependencies
```

## 🎯 Features in Detail

### Automatic Fallback System
- **Smart Detection**: Checks for API keys automatically
- **Seamless Switch**: Falls back to Bhindi when keys missing
- **No User Impact**: Works transparently
- **Cost Control**: Use premium when needed, free tier otherwise

### Image Generation
- **Premium (with OpenAI key)**: DALL-E 3 HD quality
- **Free (automatic fallback)**: Bhindi Gemini, good quality
- **Style Control**: Vivid or natural styles
- **Flexible Sizing**: Square and landscape formats

### Video Generation
- **Premium (with provider keys)**: Runway/Stability/Luma
- **Free (automatic fallback)**: Bhindi video generation
- **Multiple Providers**: Choose best for your needs
- **Polling System**: Automatic status checking

### User Experience
- **Zero Configuration**: Works immediately
- **Responsive Design**: All devices supported
- **Dark Theme**: Beautiful gradient background
- **Gallery View**: Browse all creations
- **One-Click Download**: Save instantly

## 💰 Cost Considerations

### With API Keys (Premium Quality)

**Images (OpenAI)**:
- HD Quality: ~$0.08 per image

**Videos**:
- Runway: ~$0.05-0.10 per 5-second video
- Stability: ~10 credits per video
- Luma: Subscription-based

**Example**: 1000 users generating 5000 images + 1000 videos = ~$450-500/month

### Without API Keys (Free Tier)

**Images & Videos (Bhindi)**:
- Free tier with limits
- Good quality
- No costs!

**Example**: Unlimited users within Bhindi's free tier limits = $0/month

### Hybrid Approach (Recommended)

**Add only OpenAI key**:
- Premium images: ~$0.08 each
- Free videos: Bhindi fallback
- **Best balance of quality and cost!**

## 🔒 Security Best Practices

1. **Environment Variables**: Store API keys securely
2. **Server-Side Only**: Keys never exposed to client
3. **Automatic Fallback**: Graceful degradation
4. **Rate Limiting**: Implement to prevent abuse
5. **Monitoring**: Track usage and costs
6. **Key Rotation**: Regularly update API keys

## 🐛 Troubleshooting

### "OpenAI API key not configured on server"
✅ **Solution**: App automatically uses Bhindi fallback!
📚 **Details**: See [SETUP_FIX.md](SETUP_FIX.md)

### "Runway/Stability/Luma API key not configured"
✅ **Solution**: App automatically uses Bhindi fallback!
📚 **Details**: See [VIDEO_SETUP_FIX.md](VIDEO_SETUP_FIX.md)

### Want Premium Quality?
📚 **Add API Keys**: See [DEPLOYMENT.md](DEPLOYMENT.md)

### Other Issues?
📚 **Full Guide**: See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 📚 Documentation

- **[SETUP_FIX.md](SETUP_FIX.md)** - Fix image generation errors
- **[VIDEO_SETUP_FIX.md](VIDEO_SETUP_FIX.md)** - Fix video generation errors
- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy your own instance
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API details
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Problem solutions

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🌟 Acknowledgments

- OpenAI for DALL-E 3
- Runway for Gen-3 Turbo
- Stability AI for image-to-video
- Luma Labs for Dream Machine
- Bhindi for free tier fallback
- Vercel for hosting platform

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check comprehensive guides
- **API Providers**: Contact for API-specific issues

## 🎉 What's New

### v2.1 - Automatic Fallback System
- ✅ Works without API keys!
- ✅ Automatic Bhindi fallback
- ✅ Seamless quality degradation
- ✅ Zero configuration needed
- ✅ Free tier support

### v2.0 - Server-Side Integration
- ✅ Server-side API routes
- ✅ Secure key management
- ✅ Improved user experience
- ✅ Better error handling

### v1.0 - Initial Release
- ✅ Client-side API integration
- ✅ Multiple AI providers
- ✅ Image and video generation
- ✅ Responsive design

## 🚀 Roadmap

- [x] Automatic fallback system
- [x] Free tier support
- [ ] User authentication
- [ ] Generation history
- [ ] Advanced settings
- [ ] Batch generation
- [ ] API rate limiting
- [ ] Usage analytics
- [ ] Custom models
- [ ] Social sharing

## 🎯 Quick Links

- 🔗 [Live Demo](#) (Deploy your own!)
- 📚 [Documentation](#documentation)
- 🐛 [Report Bug](https://github.com/iakash07/ai-media-generator-pro/issues)
- 💡 [Request Feature](https://github.com/iakash07/ai-media-generator-pro/issues)

---

**⭐ Star this repo if you find it useful!**

**🚀 Deploy now and start creating - no API keys required!**
