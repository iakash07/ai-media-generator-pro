# 🎨 AI Media Generator Pro

A professional-grade AI media generation platform with **FREE Gemini image generation** and optional premium providers! Create stunning images and videos with **Gemini Nano Banana Pro** (FREE), **DALL-E 3**, **Runway Gen-3**, **Stability AI**, and **Luma AI**.

![AI Media Generator](https://img.shields.io/badge/AI-Media%20Generator-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Key Features

### 🎯 **FREE Image Generation with Gemini!**
- ✨ **Gemini Nano Banana Pro** - 100% FREE, unlimited images!
- 🎨 **High Quality** - Professional-grade results
- ⚡ **Fast** - 10-30 second generation
- 🎭 **5 Aspect Ratios** - Perfect for any use case
- 💰 **No Costs** - Zero API fees

### 🖼️ Image Generation Options
- **✨ Gemini Nano Banana Pro** (FREE, default) - High quality, 5 aspect ratios
- **DALL-E 3** (optional, with OpenAI key) - HD quality, vivid/natural styles
- Multiple sizes and aspect ratios
- Advanced text rendering
- Search grounding for factual accuracy

### 🎬 Video Generation
- **Runway Gen-3 Turbo** - Text-to-video & Image-to-video
- **Stability AI** - Image-to-video animations
- **Luma AI Dream Machine** - Advanced video generation
- 5-second video duration, 16:9 aspect ratio

### 🎯 Generation Modes
1. **Image Generation** - Create stunning images from text (FREE with Gemini!)
2. **Text-to-Video** - Generate videos from descriptions
3. **Image-to-Video** - Animate your images

## 🚀 Quick Start

### For Users (Start Creating NOW!)

Just visit the deployed site and start creating:
1. Enter your prompt
2. Choose "Gemini (Free)" as provider (default)
3. Click Generate
4. Download your creation!

**✨ Gemini is FREE - No API keys needed for images!**

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

#### 3. Set up Bhindi API key (for FREE Gemini)
Create `.env.local` file:
```bash
# Required for FREE Gemini image generation
BHINDI_API_KEY=your-bhindi-api-key-here

# Optional - for premium quality alternatives
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-key
NEXT_PUBLIC_RUNWAY_API_KEY=your-runway-key
NEXT_PUBLIC_STABILITY_API_KEY=sk-your-stability-key
NEXT_PUBLIC_LUMA_API_KEY=your-luma-key
```

Get your FREE Bhindi API key at: https://bhindi.io

#### 4. Run development server
```bash
npm run dev
```

#### 5. Open browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys

### For FREE Image Generation (Recommended!)
- **Bhindi**: https://bhindi.io - Get your FREE API key
  - ✨ Unlimited Gemini image generation
  - 🎨 Professional quality
  - ⚡ Fast generation
  - 💰 Zero costs

### For Premium Alternatives (Optional)
- **OpenAI**: https://platform.openai.com (for DALL-E 3 images)
- **Runway**: https://runwayml.com (for premium videos)
- **Stability AI**: https://stability.ai (for image-to-video)
- **Luma AI**: https://lumalabs.ai (for advanced videos)

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iakash07/ai-media-generator-pro)

1. Click the button above
2. Add your `BHINDI_API_KEY` for FREE Gemini images
3. **(Optional)** Add other API keys for premium features
4. Deploy!

**Get started with FREE Gemini in minutes!**

See [GEMINI_SETUP.md](GEMINI_SETUP.md) for detailed Gemini setup instructions.
See [DEPLOYMENT.md](DEPLOYMENT.md) for general deployment guide.

## 📖 How It Works

### Image Generation Flow

```
User Request
    ↓
Choose Provider
    ↓
┌─────────────────┬─────────────────┐
│  Gemini (FREE)  │  DALL-E (Paid)  │
│  (Default)      │  (Optional)     │
├─────────────────┼─────────────────┤
│ Bhindi API      │ OpenAI API      │
│ No costs!       │ ~$0.08/image    │
└─────────────────┴─────────────────┘
    ↓                    ↓
  Result              Result
```

### API Routes

**Image Generation**:
1. `/api/gemini-image` - FREE Gemini Nano Banana Pro (default)
2. `/api/generate-image` - DALL-E 3 (optional)

**Video Generation**:
1. `/api/generate-video` - Runway/Stability/Luma

### Security

- ✅ API keys stored server-side only
- ✅ Never exposed to client
- ✅ Secure environment variables
- ✅ FREE tier with Gemini

## 🎨 Usage Examples

### Generate a FREE Image with Gemini
```
Provider: ✨ Gemini (Free) [DEFAULT]
Prompt: "A majestic dragon flying over a medieval castle at sunset"
Aspect Ratio: 16:9
→ Click Generate → Wait 10-30 seconds → Download!

Result: High-quality image, 100% FREE!
```

### Generate Premium Image with DALL-E
```
Provider: DALL-E
Prompt: "A serene landscape with mountains at sunset"
Style: Vivid
Size: 1024x1024
→ Click Generate → Wait 20-40 seconds → Download!

Result: HD quality, ~$0.08 cost
```

### Create a Video
```
Mode: Text-to-Video
Model: Runway
Prompt: "A butterfly flying through a magical forest"
→ Click Generate → Wait 30-120 seconds → Watch & Download!
```

### Animate an Image
```
Mode: Image-to-Video
Upload: Your image
Prompt: "Camera zooms in slowly"
Model: Luma
→ Click Generate → Wait 60-120 seconds → Download!
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Integration**: Server-side routes
- **AI APIs**:
  - **Gemini Nano Banana Pro** (FREE, via Bhindi)
  - OpenAI DALL-E 3 (optional)
  - Runway Gen-3 Turbo (optional)
  - Stability AI Image-to-Video (optional)
  - Luma AI Dream Machine (optional)

## 📁 Project Structure

```
ai-media-generator-pro/
├── app/
│   ├── api/                           # Server-side API routes
│   │   ├── gemini-image/              # FREE Gemini image generation
│   │   ├── generate-image/            # OpenAI image generation
│   │   ├── generate-video/            # Video generation (all providers)
│   │   └── check-video-status/        # Status checking
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Home page
│   └── globals.css                    # Global styles
├── components/
│   └── AIMediaGenerator.tsx           # Main component
├── public/                            # Static assets
├── .env.local.example                 # Environment variables template
├── README.md                          # This file
├── GEMINI_SETUP.md                    # Gemini setup guide
├── DEPLOYMENT.md                      # Deployment guide
├── API_DOCUMENTATION.md               # API details
├── QUICKSTART.md                      # Quick start guide
├── TROUBLESHOOTING.md                 # Problem solutions
└── package.json                       # Dependencies
```

## 🎯 Features in Detail

### FREE Gemini Image Generation
- **Zero Cost**: Unlimited free images
- **High Quality**: Professional-grade results
- **Fast**: 10-30 second generation
- **Flexible**: 5 aspect ratios (1:1, 16:9, 4:3, 3:4, 9:16)
- **Advanced**: Text rendering, search grounding
- **No Limits**: Generate as many as you want

### Premium DALL-E Option
- **HD Quality**: Highest quality images
- **Style Control**: Vivid or natural styles
- **Flexible Sizing**: Multiple size options
- **Image Editing**: Edit existing images
- **Revised Prompts**: See how DALL-E interpreted your prompt

### Video Generation
- **Multiple Providers**: Runway, Stability, Luma
- **Text-to-Video**: Create from descriptions
- **Image-to-Video**: Animate your images
- **Polling System**: Automatic status checking

### User Experience
- **Zero Configuration**: Works with just Bhindi key
- **Responsive Design**: All devices supported
- **Dark Theme**: Beautiful gradient background
- **Gallery View**: Browse all creations
- **One-Click Download**: Save instantly
- **Loading States**: Visual feedback during generation

## 💰 Cost Comparison

### Gemini (FREE via Bhindi)

**Images**:
- Cost: **$0** (FREE!)
- Quality: High
- Speed: 10-30 seconds
- Limits: Generous free tier

**Example**: 1000 users generating 5000 images = **$0/month**

### DALL-E 3 (Optional)

**Images**:
- Cost: ~$0.08 per image
- Quality: Very High (HD)
- Speed: 20-40 seconds

**Example**: 1000 users generating 5000 images = ~$400/month

### Videos (All Providers)

**Runway**: ~$0.05-0.10 per 5-second video
**Stability**: ~10 credits per video
**Luma**: Subscription-based

### Recommended Approach

**Start with Gemini (FREE)**:
- Zero costs
- High quality
- Perfect for most use cases

**Add DALL-E for premium needs**:
- Only when HD quality required
- Pay per use
- Best balance of quality and cost

## 🔒 Security Best Practices

1. **Environment Variables**: Store API keys securely
2. **Server-Side Only**: Keys never exposed to client
3. **Bhindi Integration**: Secure FREE tier access
4. **Rate Limiting**: Implement to prevent abuse
5. **Monitoring**: Track usage and costs
6. **Key Rotation**: Regularly update API keys

## 🐛 Troubleshooting

### "Failed to generate image"
✅ **Check**: Bhindi API key is set correctly
📚 **Guide**: See [GEMINI_SETUP.md](GEMINI_SETUP.md)

### Want to use DALL-E instead?
✅ **Add**: OpenAI API key to environment
📚 **Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

### Video generation issues?
📚 **Guide**: See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 📚 Documentation

- **[GEMINI_SETUP.md](GEMINI_SETUP.md)** - Complete Gemini setup guide
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

- Google for Gemini Nano Banana Pro
- Bhindi for FREE API access
- OpenAI for DALL-E 3
- Runway for Gen-3 Turbo
- Stability AI for image-to-video
- Luma Labs for Dream Machine
- Vercel for hosting platform

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check comprehensive guides
- **Bhindi Support**: support@bhindi.io
- **API Providers**: Contact for API-specific issues

## 🎉 What's New

### v3.0 - FREE Gemini Integration
- ✨ **NEW**: Gemini Nano Banana Pro (FREE!)
- ✨ Unlimited free image generation
- ✨ 5 aspect ratios
- ✨ Advanced text rendering
- ✨ Search grounding support
- ✨ Zero costs!

### v2.1 - Automatic Fallback System
- ✅ Works without API keys
- ✅ Automatic Bhindi fallback
- ✅ Seamless quality degradation
- ✅ Zero configuration needed

### v2.0 - Server-Side Integration
- ✅ Server-side API routes
- ✅ Secure key management
- ✅ Improved user experience
- ✅ Better error handling

## 🚀 Roadmap

- [x] FREE Gemini image generation
- [x] Multiple aspect ratios
- [x] Advanced text rendering
- [ ] User authentication
- [ ] Generation history
- [ ] Advanced settings
- [ ] Batch generation
- [ ] API rate limiting
- [ ] Usage analytics
- [ ] Custom models
- [ ] Social sharing

## 🎯 Quick Links

- 🔗 [Live Demo](https://ai-media-generator-bay.vercel.app/)
- 📚 [Gemini Setup Guide](GEMINI_SETUP.md)
- 📚 [Documentation](#documentation)
- 🐛 [Report Bug](https://github.com/iakash07/ai-media-generator-pro/issues)
- 💡 [Request Feature](https://github.com/iakash07/ai-media-generator-pro/issues)

---

**⭐ Star this repo if you find it useful!**

**🚀 Deploy now and start creating FREE images with Gemini!**

**✨ No costs, no limits, just creativity!**
