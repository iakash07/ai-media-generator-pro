# 🎨 AI Media Generator Pro

A professional-grade AI media generation platform with **Google Gemini Pro & Veo** integration! Create stunning images and videos with **Gemini Bhindi** (FREE), **Gemini Pro**, **Google Veo**, **DALL-E 3**, **Runway Gen-3**, **Stability AI**, and **Luma AI**.

![AI Media Generator](https://img.shields.io/badge/AI-Media%20Generator-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Google Gemini](https://img.shields.io/badge/Google-Gemini%20Pro-blue?style=for-the-badge&logo=google)
![Google Veo](https://img.shields.io/badge/Google-Veo-red?style=for-the-badge&logo=google)

## ✨ Key Features

### 🎯 **Three Image Generation Options!**
- **✨ Gemini Bhindi** (FREE, default) - 100% FREE, unlimited images!
- **🚀 Gemini Pro** (NEW!) - Google's state-of-the-art Imagen 3 model
- **🎨 DALL-E 3** - OpenAI's premium image generation
- 🎭 **5 Aspect Ratios** - Perfect for any use case
- ⚡ **Fast** - 10-40 second generation
- 💰 **Flexible Pricing** - FREE to premium options

### 🎬 **Four Video Generation Options!**
- **🎬 Google Veo** (NEW!) - Professional video generation from Google
- **🎥 Runway Gen-3 Turbo** - Fast, high-quality videos
- **🎞️ Stability AI** - Image-to-video animations
- **🌟 Luma Dream Machine** - Advanced video effects
- 📹 **Text-to-Video** & **Image-to-Video** modes
- 🎯 **5-second duration**, 16:9 aspect ratio

### 🖼️ Image Generation Features
- **Gemini Bhindi (FREE)**: High quality, 5 aspect ratios, unlimited
- **Gemini Pro (Imagen 3)**: Very high quality, advanced features, Google Cloud pricing
- **DALL-E 3**: HD quality, vivid/natural styles, ~$0.08/image
- Multiple sizes and aspect ratios
- Advanced text rendering
- Search grounding for factual accuracy

### 🎬 Video Generation Features
- **Google Veo**: Professional-grade, text-to-video & image-to-video
- **Runway Gen-3**: Fast generation, high quality
- **Stability AI**: Image animation, smooth transitions
- **Luma Dream Machine**: Advanced effects, cinematic quality
- Automatic status polling
- Download in MP4 format

### 🎯 Generation Modes
1. **Image Generation** - Create stunning images from text
2. **Text-to-Video** - Generate videos from descriptions
3. **Image-to-Video** - Animate your images

## 🚀 Quick Start

### For Users (Start Creating NOW!)

Just visit the deployed site and start creating:
1. Enter your prompt
2. Choose your provider:
   - **✨ Gemini (Free)** - No API key needed!
   - **🚀 Gemini Pro** - Add Google API key
   - **🎬 Google Veo** - Add Google API key
3. Click Generate
4. Download your creation!

**✨ Start FREE with Gemini Bhindi - No API keys needed!**

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

#### 3. Set up API keys
Create `.env.local` file:
```bash
# Required for FREE Gemini Bhindi image generation
BHINDI_API_KEY=your-bhindi-api-key-here

# Optional - for Google Gemini Pro & Veo
GOOGLE_API_KEY=your-google-api-key-here

# Optional - for other premium providers
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-key
NEXT_PUBLIC_RUNWAY_API_KEY=your-runway-key
NEXT_PUBLIC_STABILITY_API_KEY=sk-your-stability-key
NEXT_PUBLIC_LUMA_API_KEY=your-luma-key
```

**Get your API keys:**
- **Bhindi** (FREE): https://bhindi.io
- **Google**: https://makersuite.google.com/app/apikey
- **OpenAI**: https://platform.openai.com
- **Runway**: https://runwayml.com
- **Stability**: https://stability.ai
- **Luma**: https://lumalabs.ai

#### 4. Run development server
```bash
npm run dev
```

#### 5. Open browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys Guide

### 🆓 FREE Option (No API Key Needed!)
- **Gemini Bhindi**: https://bhindi.io
  - ✨ Unlimited image generation
  - 🎨 Professional quality
  - ⚡ Fast (10-30 seconds)
  - 💰 Zero costs
  - 🚀 No credit card required

### 🚀 Google AI (Recommended for Pro Features)
- **Google API Key**: https://makersuite.google.com/app/apikey
  - 🎨 Gemini Pro (Imagen 3) - State-of-the-art images
  - 🎬 Google Veo - Professional videos
  - 💰 Pay-per-use pricing
  - 🔧 Advanced features
  - 📊 Usage tracking in Google Cloud

### 🎨 Alternative Premium Providers
- **OpenAI**: https://platform.openai.com (DALL-E 3)
- **Runway**: https://runwayml.com (Gen-3 videos)
- **Stability AI**: https://stability.ai (Image-to-video)
- **Luma AI**: https://lumalabs.ai (Dream Machine)

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iakash07/ai-media-generator-pro)

1. Click the button above
2. Add your `BHINDI_API_KEY` for FREE images
3. **(Optional)** Add `GOOGLE_API_KEY` for Gemini Pro & Veo
4. **(Optional)** Add other API keys for more providers
5. Deploy!

**Start with FREE Gemini, upgrade to Pro when you need it!**

See [GOOGLE_GEMINI_VEO_SETUP.md](GOOGLE_GEMINI_VEO_SETUP.md) for detailed Google setup.
See [GEMINI_SETUP.md](GEMINI_SETUP.md) for Bhindi Gemini setup.
See [DEPLOYMENT.md](DEPLOYMENT.md) for general deployment guide.

## 📖 How It Works

### Image Generation Flow

```
User Request
    ↓
Choose Provider
    ↓
┌──────────────┬──────────────┬──────────────┐
│ Gemini Free  │ Gemini Pro   │  DALL-E 3    │
│ (Default)    │ (Google)     │  (OpenAI)    │
├──────────────┼──────────────┼──────────────┤
│ Bhindi API   │ Google API   │ OpenAI API   │
│ FREE!        │ ~$0.02-0.05  │ ~$0.08       │
└──────────────┴──────────────┴──────────────┘
    ↓              ↓              ↓
  Result         Result         Result
```

### Video Generation Flow

```
User Request
    ↓
Choose Model
    ↓
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Google Veo   │  Runway      │  Stability   │    Luma      │
│ (NEW!)       │  Gen-3       │  AI          │  Dream       │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ Google API   │ Runway API   │ Stability    │ Luma API     │
│ ~$0.10-0.20  │ ~$0.05-0.10  │ ~10 credits  │ Subscription │
└──────────────┴──────────────┴──────────────┴──────────────┘
    ↓              ↓              ↓              ↓
  Result         Result         Result         Result
```

### API Routes

**Image Generation**:
1. `/api/gemini-image` - FREE Gemini Bhindi (default)
2. `/api/google-gemini-image` - Gemini Pro (Imagen 3)
3. `/api/generate-image` - DALL-E 3

**Video Generation**:
1. `/api/google-veo-video` - Google Veo (NEW!)
2. `/api/generate-video` - Runway/Stability/Luma
3. `/api/google-veo-status` - Veo status polling

### Security

- ✅ API keys stored client-side (localStorage)
- ✅ Direct API calls from browser
- ✅ No server-side key storage
- ✅ Full user control over keys
- ✅ FREE tier with Gemini Bhindi

## 🎨 Usage Examples

### Generate FREE Image with Gemini Bhindi
```
Provider: ✨ Gemini (Free) [DEFAULT]
Prompt: "A majestic dragon flying over a medieval castle at sunset"
Aspect Ratio: 16:9
→ Click Generate → Wait 10-30 seconds → Download!

Result: High-quality image, 100% FREE!
```

### Generate Premium Image with Gemini Pro
```
Provider: 🚀 Gemini Pro
Prompt: "Professional product photo of luxury smartwatch, studio lighting"
Aspect Ratio: 1:1
→ Click Generate → Wait 15-40 seconds → Download!

Result: State-of-the-art quality, ~$0.02-0.05 cost
```

### Generate Video with Google Veo
```
Mode: Text-to-Video
Model: 🎬 Google Veo
Prompt: "A butterfly flying through a magical forest, cinematic"
→ Click Generate → Wait 30-120 seconds → Watch & Download!

Result: Professional-grade video, ~$0.10-0.20 cost
```

### Animate Image with Veo
```
Mode: Image-to-Video
Model: 🎬 Google Veo
Upload: [Your image]
Prompt: "Slow 360-degree rotation with dramatic lighting"
→ Click Generate → Wait 60-120 seconds → Download!

Result: Smooth animation, professional quality
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Integration**: Direct client-side calls
- **AI APIs**:
  - **Gemini Bhindi** (FREE, via Bhindi)
  - **Google Gemini Pro** (Imagen 3)
  - **Google Veo** (Video generation)
  - OpenAI DALL-E 3 (optional)
  - Runway Gen-3 Turbo (optional)
  - Stability AI (optional)
  - Luma AI Dream Machine (optional)

## 📁 Project Structure

```
ai-media-generator-pro/
├── app/
│   ├── api/                              # Server-side API routes
│   │   ├── gemini-image/                 # FREE Gemini Bhindi
│   │   ├── google-gemini-image/          # Gemini Pro (Imagen 3)
│   │   ├── google-veo-video/             # Google Veo video
│   │   ├── google-veo-status/            # Veo status polling
│   │   ├── generate-image/               # DALL-E 3
│   │   ├── generate-video/               # Other video providers
│   │   └── check-video-status/           # Status checking
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Home page
│   └── globals.css                       # Global styles
├── components/
│   └── AIMediaGenerator.tsx              # Main component
├── public/                               # Static assets
├── .env.local.example                    # Environment variables
├── README.md                             # This file
├── GOOGLE_GEMINI_VEO_SETUP.md           # Google setup guide
├── GEMINI_SETUP.md                       # Bhindi Gemini guide
├── DEPLOYMENT.md                         # Deployment guide
└── package.json                          # Dependencies
```

## 💰 Cost Comparison

### Image Generation

| Provider | Cost per Image | Quality | Speed | API Key |
|----------|---------------|---------|-------|---------|
| **Gemini Bhindi** | **FREE** ✅ | High | 10-30s | Bhindi (free) |
| **Gemini Pro** | ~$0.02-0.05 | Very High | 15-40s | Google |
| **DALL-E 3** | ~$0.08 | Very High | 20-40s | OpenAI |

### Video Generation

| Provider | Cost per Video | Quality | Speed | API Key |
|----------|---------------|---------|-------|---------|
| **Google Veo** | ~$0.10-0.20 | Professional | 30-120s | Google |
| **Runway** | ~$0.05-0.10 | High | 30-90s | Runway |
| **Stability** | ~10 credits | Good | 60-120s | Stability |
| **Luma** | Subscription | High | 60-120s | Luma |

### Recommended Approach

**Start FREE**:
- Use Gemini Bhindi for unlimited free images
- Zero costs, high quality
- Perfect for testing and most use cases

**Upgrade to Pro**:
- Add Google API key for Gemini Pro & Veo
- State-of-the-art quality
- Professional video generation
- Pay only for what you use

**Mix & Match**:
- Use FREE Gemini for most images
- Use Gemini Pro for critical projects
- Use Veo for professional videos
- Best balance of quality and cost!

## 🔒 Security Best Practices

1. **API Key Storage**: Keys stored in browser localStorage
2. **Direct API Calls**: Browser calls APIs directly
3. **No Server Storage**: Keys never sent to our servers
4. **User Control**: Delete keys anytime
5. **FREE Tier**: No keys needed for Gemini Bhindi

## 🐛 Troubleshooting

### "Google API key is required"
✅ **Solution**: 
1. Click "API Settings"
2. Add your Google API key
3. Get key from: https://makersuite.google.com/app/apikey

### "Failed to generate image/video"
✅ **Check**:
1. API key is correct
2. Required APIs enabled in Google Cloud
3. Quota not exceeded
4. Prompt is appropriate

📚 **Guide**: See [GOOGLE_GEMINI_VEO_SETUP.md](GOOGLE_GEMINI_VEO_SETUP.md)

### Want to use FREE option?
✅ **Use**: Gemini Bhindi (no API key needed!)
📚 **Guide**: See [GEMINI_SETUP.md](GEMINI_SETUP.md)

## 📚 Documentation

- **[GOOGLE_GEMINI_VEO_SETUP.md](GOOGLE_GEMINI_VEO_SETUP.md)** - Complete Google setup guide
- **[GEMINI_SETUP.md](GEMINI_SETUP.md)** - Bhindi Gemini setup
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

- **Google** for Gemini Pro (Imagen 3) and Veo
- **Bhindi** for FREE Gemini API access
- **OpenAI** for DALL-E 3
- **Runway** for Gen-3 Turbo
- **Stability AI** for image-to-video
- **Luma Labs** for Dream Machine
- **Vercel** for hosting platform

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check comprehensive guides
- **Google Cloud Support**: https://cloud.google.com/support
- **Bhindi Support**: support@bhindi.io

## 🎉 What's New

### v4.0 - Google Gemini Pro & Veo Integration
- 🚀 **NEW**: Google Gemini Pro (Imagen 3)
- 🎬 **NEW**: Google Veo video generation
- ✨ Three image generation options
- 🎥 Four video generation options
- 🔧 Direct Google API integration
- 📊 Advanced features & controls

### v3.0 - FREE Gemini Integration
- ✨ Gemini Bhindi (FREE!)
- ✨ Unlimited free image generation
- ✨ 5 aspect ratios
- ✨ Advanced text rendering

### v2.0 - Server-Side Integration
- ✅ Server-side API routes
- ✅ Secure key management
- ✅ Improved user experience

## 🚀 Roadmap

- [x] FREE Gemini image generation
- [x] Google Gemini Pro integration
- [x] Google Veo video generation
- [ ] Batch generation
- [ ] Custom video durations
- [ ] More aspect ratios
- [ ] Advanced editing features
- [ ] Generation history
- [ ] User authentication
- [ ] Favorites & collections

## 🎯 Quick Links

- 🔗 [Live Demo](https://ai-media-generator-bay.vercel.app/)
- 📚 [Google Setup Guide](GOOGLE_GEMINI_VEO_SETUP.md)
- 📚 [Gemini Bhindi Guide](GEMINI_SETUP.md)
- 📚 [Documentation](#documentation)
- 🐛 [Report Bug](https://github.com/iakash07/ai-media-generator-pro/issues)
- 💡 [Request Feature](https://github.com/iakash07/ai-media-generator-pro/issues)

---

**⭐ Star this repo if you find it useful!**

**🚀 Deploy now and start creating with Google Gemini Pro & Veo!**

**✨ Start FREE, upgrade to Pro when you need it!**

**🎨 Three image options: FREE → Pro → Premium**

**🎬 Four video options: Veo → Runway → Stability → Luma**
