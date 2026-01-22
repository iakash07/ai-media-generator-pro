# 🎨 AI Media Generator Pro

A professional-grade AI media generation platform with **server-side API integration** - no API keys required for users! Supports **DALL-E 3** for images and **Runway Gen-3**, **Stability AI**, and **Luma AI** for videos.

![AI Media Generator](https://img.shields.io/badge/AI-Media%20Generator-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Key Features

### 🎯 **No API Keys Required for Users!**
- Server-side API integration
- Users can generate immediately
- No configuration needed
- Free for everyone to use

### 🖼️ Image Generation
- **DALL-E 3** integration with HD quality
- Two styles: Vivid & Natural
- Multiple sizes: 1024x1024, 1792x1024, 1024x1792
- Revised prompt display

### 🎬 Video Generation
- **Runway Gen-3 Turbo** - Text-to-video & Image-to-video
- **Stability AI** - Image-to-video animations
- **Luma AI Dream Machine** - Advanced video generation
- 5-second video duration
- 16:9 aspect ratio

### 🎯 Modes
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

#### 3. Set up environment variables
Create `.env.local` file:
```bash
OPENAI_API_KEY=sk-your-openai-key
RUNWAY_API_KEY=your-runway-key
STABILITY_API_KEY=sk-your-stability-key
LUMA_API_KEY=your-luma-key
```

#### 4. Run development server
```bash
npm run dev
```

#### 5. Open browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting API Keys (For Deployment)

### Required
- **OpenAI**: https://platform.openai.com (for images)

### Optional (at least one for videos)
- **Runway**: https://runwayml.com
- **Stability AI**: https://stability.ai
- **Luma AI**: https://lumalabs.ai

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iakash07/ai-media-generator-pro)

1. Click the button above
2. Add your API keys as environment variables
3. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📖 How It Works

### Architecture

```
User Browser → Next.js API Routes → AI Provider APIs
                    ↓
            Environment Variables
            (Secure API Keys)
```

### API Routes

1. **`/api/generate-image`** - Handles DALL-E 3 image generation
2. **`/api/generate-video`** - Initiates video generation
3. **`/api/check-video-status`** - Polls for video completion

### Security

- ✅ API keys stored server-side only
- ✅ Never exposed to client
- ✅ Secure environment variables
- ✅ No client-side key management

## 🎨 Usage Examples

### Generate an Image
```
Prompt: "A majestic dragon flying over a medieval castle at sunset"
Style: Vivid
Size: 1024x1024
→ Click Generate → Wait 10-30 seconds → Download!
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
  - OpenAI DALL-E 3
  - Runway Gen-3 Turbo
  - Stability AI Image-to-Video
  - Luma AI Dream Machine

## 📁 Project Structure

```
ai-media-generator-pro/
├── app/
│   ├── api/                    # Server-side API routes
│   │   ├── generate-image/     # Image generation endpoint
│   │   ├── generate-video/     # Video generation endpoint
│   │   └── check-video-status/ # Status polling endpoint
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── AIMediaGenerator.tsx           # Client-side keys version
│   └── AIMediaGeneratorServerless.tsx # Server-side version (active)
├── public/                     # Static assets
├── .env.local.example          # Environment variables template
├── README.md                   # This file
├── DEPLOYMENT.md               # Deployment guide
├── API_DOCUMENTATION.md        # API details
├── QUICKSTART.md               # Quick start guide
├── TROUBLESHOOTING.md          # Problem solutions
└── package.json                # Dependencies
```

## 🎯 Features in Detail

### Server-Side Benefits
- **No User Configuration**: Works immediately
- **Secure**: API keys never exposed
- **Centralized**: Easy to manage and update
- **Cost Control**: Monitor and limit usage
- **Better UX**: No setup friction

### Image Generation
- **DALL-E 3 HD Quality**: Highest quality images
- **Style Control**: Vivid or natural styles
- **Flexible Sizing**: Square and landscape formats
- **Prompt Enhancement**: See DALL-E's interpretation

### Video Generation
- **Multiple Providers**: Choose best for your needs
- **Polling System**: Automatic status checking
- **Error Handling**: Clear error messages
- **Progress Indication**: Real-time status updates

### User Experience
- **Responsive Design**: Works on all devices
- **Dark Theme**: Beautiful gradient background
- **Gallery View**: Browse all creations
- **One-Click Download**: Save instantly
- **No Registration**: Start creating immediately

## 💰 Cost Considerations

### API Costs (per generation)

**Images (OpenAI)**:
- HD Quality: ~$0.08 per image

**Videos**:
- Runway: ~$0.05-0.10 per 5-second video
- Stability: ~10 credits per video
- Luma: Subscription-based

### Hosting (Vercel)
- **Free Tier**: 100GB bandwidth/month
- **Pro**: $20/month for more resources

### Example Monthly Cost
For 1000 users generating:
- 5000 images: ~$400
- 1000 videos: ~$50-100
- **Total**: ~$450-500/month

## 🔒 Security Best Practices

1. **Environment Variables**: Store API keys securely
2. **Rate Limiting**: Implement to prevent abuse
3. **Monitoring**: Track usage and costs
4. **Key Rotation**: Regularly update API keys
5. **Error Handling**: Don't expose sensitive info

## 📊 Monitoring & Analytics

### Track
- Request count
- Response times
- Error rates
- API costs
- User engagement

### Tools
- Vercel Analytics
- Custom logging
- Provider dashboards

## 🐛 Troubleshooting

### Common Issues

**"API key not configured on server"**
- Add environment variables in hosting platform
- Verify keys are correct
- Redeploy after adding keys

**Generation fails**
- Check API provider status
- Verify account has credits
- Review error messages

**Slow performance**
- Videos take 30-120 seconds (normal)
- Check internet connection
- Try different provider

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions.

## 📚 Documentation

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
- Vercel for hosting platform

## 📞 Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check comprehensive guides
- **API Providers**: Contact for API-specific issues

## 🎉 What's New

### v2.0 - Server-Side Integration
- ✅ No API keys required for users
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

- [ ] User authentication
- [ ] Generation history
- [ ] Advanced settings
- [ ] Batch generation
- [ ] API rate limiting
- [ ] Usage analytics
- [ ] Custom models
- [ ] Social sharing

---

**Built with ❤️ using Next.js and AI**

🔗 [Live Demo](#) | 📚 [Documentation](#) | 🐛 [Report Bug](https://github.com/iakash07/ai-media-generator-pro/issues)

**⭐ Star this repo if you find it useful!**
