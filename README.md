# 🎨 AI Image Generator - 100% FREE

A beautiful, simple AI image generator powered by **Bhindi's Gemini Nano Banana Pro**. Generate unlimited high-quality images completely FREE - no API keys, no subscriptions, no limits!

![AI Image Generator](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Free](https://img.shields.io/badge/Cost-FREE-brightgreen)

## ✨ Features

- 🎨 **100% FREE** - Unlimited image generation
- 🚀 **No API Keys Required** - Works out of the box
- 🎯 **High Quality** - Powered by Gemini Nano Banana Pro
- 📐 **5 Aspect Ratios** - Square, Landscape, Portrait, Standard, Story
- 💾 **Easy Download** - One-click image downloads
- 🖼️ **Gallery View** - See all your creations
- ⚡ **Fast Generation** - 10-30 seconds per image
- 🎭 **Beautiful UI** - Modern gradient design

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/iakash07/ai-media-generator-pro.git
cd ai-media-generator-pro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variable

Create a `.env.local` file:

```bash
BHINDI_API_KEY=bhn_sk_live_1737629063_c0e8e1e5-e8e5-4e8e-8e5e-c0e8e1e5e8e5
```

### 4. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🎯 How to Use

1. **Enter a Prompt**: Describe what you want to create
   - Example: "a beautiful sunset over mountains"
   - Example: "a cat wearing sunglasses"
   - Example: "a futuristic city at night"

2. **Choose Aspect Ratio**: Select from 5 options
   - Square (1:1) - Perfect for social media
   - Landscape (16:9) - Great for wallpapers
   - Standard (4:3) - Classic format
   - Portrait (3:4) - Ideal for prints
   - Story (9:16) - Perfect for Instagram stories

3. **Generate**: Click "Generate FREE Image"

4. **Download**: Save your creation with one click

## 📐 Aspect Ratios

| Ratio | Name | Best For |
|-------|------|----------|
| 1:1 | Square | Instagram posts, profile pictures |
| 16:9 | Landscape | YouTube thumbnails, wallpapers |
| 4:3 | Standard | Presentations, classic photos |
| 3:4 | Portrait | Posters, prints |
| 9:16 | Story | Instagram/TikTok stories |

## 🎨 Example Prompts

### Nature
- "a serene mountain lake at sunrise"
- "a tropical beach with palm trees"
- "northern lights over snowy mountains"

### Animals
- "a majestic lion in the savanna"
- "a cute puppy playing in the park"
- "a colorful parrot in the rainforest"

### Fantasy
- "a magical castle in the clouds"
- "a dragon flying over a medieval city"
- "an enchanted forest with glowing mushrooms"

### Sci-Fi
- "a futuristic city with flying cars"
- "a space station orbiting Earth"
- "a robot in a cyberpunk street"

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Gemini Nano Banana Pro (via Bhindi API)
- **Icons**: Lucide React

## 📦 Project Structure

```
ai-media-generator-pro/
├── app/
│   ├── api/
│   │   └── gemini-image/
│   │       └── route.ts          # API endpoint for image generation
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   └── AIMediaGenerator.tsx      # Main component
├── public/                       # Static assets
├── .env.local                    # Environment variables (create this)
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🌐 Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variable:
   - Name: `BHINDI_API_KEY`
   - Value: `bhn_sk_live_1737629063_c0e8e1e5-e8e5-4e8e-8e5e-c0e8e1e5e8e5`
5. Click "Deploy"

Your app will be live in 2-3 minutes! 🎉

## 💡 Tips for Best Results

1. **Be Specific**: More details = better results
   - ❌ "a dog"
   - ✅ "a golden retriever puppy playing in a sunny garden"

2. **Add Style**: Mention artistic styles
   - "in watercolor style"
   - "digital art"
   - "photorealistic"
   - "anime style"

3. **Include Details**: Colors, lighting, mood
   - "warm sunset lighting"
   - "vibrant colors"
   - "moody atmosphere"

4. **Use Adjectives**: Descriptive words help
   - "majestic", "serene", "vibrant", "mysterious"

## 🐛 Troubleshooting

### Images Not Generating?

1. **Check Environment Variable**:
   - Make sure `BHINDI_API_KEY` is set in `.env.local` (local)
   - Or in Vercel environment variables (production)

2. **Redeploy** (if on Vercel):
   - Go to Deployments → Click "..." → Redeploy

3. **Clear Browser Cache**:
   - Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

4. **Check Console**:
   - Press F12 → Console tab → Look for errors

### Slow Generation?

- Image generation takes 10-30 seconds
- This is normal for AI image generation
- Be patient! 😊

## 📝 License

MIT License - feel free to use this project however you like!

## 🙏 Credits

- **AI Model**: Gemini Nano Banana Pro by Google
- **API Provider**: Bhindi AI
- **Framework**: Next.js by Vercel
- **Icons**: Lucide React

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

## 📧 Contact

- **GitHub**: [@iakash07](https://github.com/iakash07)
- **Email**: akashyadau99@gmail.com

---

**Made with ❤️ by Akash Kumar**

**🎉 Start creating amazing images for FREE today!**
