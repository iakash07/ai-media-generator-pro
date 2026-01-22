# 🎨 AI Media Generator Pro

A professional-grade AI media generation platform supporting **DALL-E 3** for images and **Runway Gen-3**, **Stability AI**, and **Luma AI** for videos.

![AI Media Generator](https://img.shields.io/badge/AI-Media%20Generator-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 🖼️ Image Generation
- **DALL-E 3** integration with HD quality
- Two styles: Vivid & Natural
- Multiple sizes: 1024x1024, 1792x1024, 1024x1792
- Image editing capabilities
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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- API keys from:
  - [OpenAI](https://platform.openai.com) for DALL-E 3
  - [Runway](https://runwayml.com) for Gen-3 video
  - [Stability AI](https://stability.ai) for image-to-video
  - [Luma Labs](https://lumalabs.ai) for Dream Machine

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/iakash07/ai-media-generator-pro.git
cd ai-media-generator-pro
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Configuration

1. Click the **API Settings** button
2. Enter your API keys:
   - **OpenAI API Key** - For image generation
   - **Runway API Key** - For Gen-3 video generation
   - **Stability AI Key** - For image-to-video
   - **Luma AI Key** - For Dream Machine videos
3. Keys are stored securely in your browser's localStorage

## 📖 Usage Guide

### Image Generation
1. Select **Image Generation** mode
2. Enter your prompt (e.g., "A serene mountain landscape at sunset")
3. Choose style (Vivid/Natural) and size
4. Click **Generate Image**
5. Download your creation!

### Image Editing
1. In **Image Generation** mode, click "Or upload an image to edit"
2. Upload your image
3. Enter editing instructions (e.g., "Make the sky more dramatic")
4. Click **Generate Edited Image**

### Text-to-Video
1. Select **Text-to-Video** mode
2. Choose your video model (Runway/Luma)
3. Enter video description
4. Click **Generate Video**
5. Wait 30-120 seconds for processing

### Image-to-Video
1. Select **Image-to-Video** mode
2. Upload an image
3. Optionally add animation instructions
4. Choose video model
5. Click **Generate Video**

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI APIs**:
  - OpenAI DALL-E 3
  - Runway Gen-3 Turbo
  - Stability AI Image-to-Video
  - Luma AI Dream Machine

## 📁 Project Structure

```
ai-media-generator-pro/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   └── AIMediaGenerator.tsx # Main component
├── public/                 # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🎨 Features in Detail

### Image Generation
- **DALL-E 3 HD Quality**: Highest quality image generation
- **Style Control**: Choose between vivid and natural styles
- **Flexible Sizing**: Square and landscape formats
- **Prompt Enhancement**: See how DALL-E interprets your prompt

### Video Generation
- **Multiple Providers**: Choose the best model for your needs
- **Polling System**: Automatic status checking until completion
- **Error Handling**: Clear error messages and retry logic
- **Progress Indication**: Real-time generation status

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Beautiful gradient background
- **Gallery View**: Browse all your creations
- **One-Click Download**: Save images and videos instantly
- **Local Storage**: API keys persist across sessions

## ⚠️ Important Notes

- **Stability AI** only supports image-to-video (not text-to-video)
- Video generation takes **30-120 seconds** depending on the provider
- API keys are stored **locally** in your browser
- **Never share** your API keys with anyone
- Some providers may have usage limits or costs

## 🔒 Security

- API keys stored in browser localStorage only
- No server-side key storage
- Direct API calls from browser
- CORS-enabled endpoints

## 🐛 Troubleshooting

### "Failed to generate image"
- Check your OpenAI API key is valid
- Ensure you have credits in your OpenAI account
- Verify your prompt doesn't violate content policies

### "Video generation timed out"
- Video generation can take up to 2 minutes
- Check your API key for the selected provider
- Try a different video model

### "Please add your API key"
- Click API Settings and enter your keys
- Make sure to click "Save & Close"
- Refresh the page if keys don't persist

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

## 🌟 Acknowledgments

- OpenAI for DALL-E 3
- Runway for Gen-3 Turbo
- Stability AI for image-to-video
- Luma Labs for Dream Machine
- Vercel for Next.js

---

**Built with ❤️ using Next.js and AI**

🔗 [Live Demo](#) | 📚 [Documentation](#) | 🐛 [Report Bug](https://github.com/iakash07/ai-media-generator-pro/issues)
