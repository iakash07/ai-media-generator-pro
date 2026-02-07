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
2. Add your `BHINDI_API_KEY` for FREE images
3. **(Optional)** Add other API keys for more providers
4. Deploy!

**Start with FREE Gemini, upgrade to premium when you need it!**

See [GEMINI_SETUP.md](GEMINI_SETUP.md) for Bhindi Gemini setup.
See [DEPLOYMENT.md](DEPLOYMENT.md) for general deployment guide.

## 📖 How It Works

### Image Generation Flow

```
User Request
    ↓
Choose Provider
    ↓
┌──────────────┬──────────────┐
│ Gemini Free  │  DALL-E 3    │
│ (Default)    │  (OpenAI)    │
├──────────────┼──────────────┤
│ Bhindi API   │ OpenAI API   │
│ FREE!        │ ~$0.08       │
└──────────────┴──────────────┘
    ↓              ↓
  Result         Result
```

### Video Generation Flow

```
User Request
    ↓
Choose Model
    ↓
┌──────────────┬──────────────┬──────────────┐
│  Runway      │  Stability   │    Luma      │
│  Gen-3       │  AI          │  Dream       │
├──────────────┼──────────────┼──────────────┤
│ Runway API   │ Stability    │ Luma API     │
│ ~$0.05-0.10  │ ~10 credits  │ Subscription │
└──────────────┴──────────────┴──────────────┘
    ↓              ↓              ↓
  Result         Result         Result
```

### API Routes

**Image Generation**:
1. `/api/gemini-image` - FREE Gemini Bhindi (default)
2. `/api/generate-image` - DALL-E 3

**Video Generation**:
1. `/api/generate-video` - Runway/Stability/Luma
2. `/api/check-video-status` - Status checking

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

### Generate Premium Image with DALL-E 3
```
Provider: DALL-E 3
Prompt: "Professional product photo of luxury smartwatch, studio lighting"
Style: Vivid
Size: 1024x1024
→ Click Generate → Wait 20-40 seconds → Download!

Result: HD quality, ~$0.08 cost
```

### Generate Video with Runway
```
Mode: Text-to-Video
Model: Runway Gen-3
Prompt: "A butterfly flying through a magical forest, cinematic"
→ Click Generate → Wait 30-90 seconds → Watch & Download!

Result: High-quality video, ~$0.05-0.10 cost
```

### Animate Image with Stability AI
```
Mode: Image-to-Video
Model: Stability AI
Upload: [Your image]
Prompt: "Slow zoom in with dramatic lighting"
→ Click Generate → Wait 60-120 seconds → Download!

Result: Smooth animation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Integration**: Direct client-side calls
- **AI APIs**:
  - **Gemini Bhindi** (FREE, via Bhindi)
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
│   │   ├── generate-image/               # DALL-E 3
│   │   ├── generate-video/               # Video providers
│   │   └── check-video-status/           # Status checking
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Home page
│   └── globals.css                       # Global styles
├── components/
│   └── AIMediaGenerator.tsx              # Main component
├── public/                               # Static assets
├── .env.local.example                    # Environment variables
├── README.md                             # This file
├── GEMINI_SETUP.md                       # Bhindi Gemini guide
├── DEPLOYMENT.md                         # Deployment guide
└── package.json                          # Dependencies
```

## 💰 Cost Comparison

### Image Generation

| Provider | Cost per Image | Quality | Speed | API Key |
|----------|---------------|---------|-------|---------|
| **Gemini Bhindi** | **FREE** ✅ | High | 10-30s | Bhindi (free) |
| **DALL-E 3** | ~$0.08 | Very High | 20-40s | OpenAI |

### Video Generation

| Provider | Cost per Video | Quality | Speed | API Key |
|----------|---------------|---------|-------|---------|
| **Runway** | ~$0.05-0.10 | High | 30-90s | Runway |
| **Stability** | ~10 credits | Good | 60-120s | Stability |
| **Luma** | Subscription | High | 60-120s | Luma |

### Recommended Approach

**Start FREE**:
- Use Gemini Bhindi for unlimited free images
- Zero costs, high quality
- Perfect for testing and most use cases

**Upgrade to Premium**:
- Use DALL-E 3 for critical projects
- Use Runway/Stability/Luma for videos
- Pay only for what you use

**Mix & Match**:
- Use FREE Gemini for most images
- Use DALL-E 3 for highest quality needs
- Best balance of quality and cost!

## 🔒 Security Best Practices

1. **API Key Storage**: Keys stored in browser localStorage
2. **Direct API Calls**: Browser calls APIs directly
3. **No Server Storage**: Keys never sent to our servers
4. **User Control**: Delete keys anytime
5. **FREE Tier**: No keys needed for Gemini Bhindi

## 🐛 Troubleshooting

### "Failed to generate image"
✅ **Solution**: 
- Gemini Bhindi is FREE and should work without any API key
- Make sure your Bhindi API key is set in `.env.local`
- Check the console for detailed error messages

### Want to use DALL-E 3?
✅ **Setup**:
1. Click "API Settings"
2. Add your OpenAI API key
3. Select "DALL-E 3" as provider
4. Generate!

### Video generation issues?
✅ **Check**:
1. API key is correct for selected model
2. Image is uploaded (for image-to-video)
3. Prompt is appropriate
4. Wait for status polling to complete

## 📚 Documentation

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

- **Bhindi** for FREE Gemini API access
- **OpenAI** for DALL-E 3
- **Runway** for Gen-3 Turbo
- **Stability AI** for image-to-video
- **Luma Labs** for Dream Machine
- **Vercel** for hosting platform

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check comprehensive guides
- **Bhindi Support**: support@bhindi.io

## 🎉 What's New

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
- [ ] Batch generation
- [ ] More aspect ratios
- [ ] Advanced editing features
- [ ] Generation history
- [ ] User authentication
- [ ] Favorites & collections

## 🎯 Quick Links

- 🔗 [Live Demo](https://ai-media-generator-bay.vercel.app/)
- 📚 [Gemini Bhindi Guide](GEMINI_SETUP.md)
- 📚 [Documentation](#documentation)
- 🐛 [Report Bug](https://github.com/iakash07/ai-media-generator-pro/issues)
- 💡 [Request Feature](https://github.com/iakash07/ai-media-generator-pro/issues)

---

**⭐ Star this repo if you find it useful!**

**🚀 Deploy now and start creating with FREE Gemini!**

**✨ Start FREE, upgrade to premium when you need it!**

**🎨 Two image options: FREE Gemini → Premium DALL-E 3**

**🎬 Three video options: Runway → Stability → Luma**
