# 🚀 Quick Start Guide

Get up and running with AI Media Generator Pro in 5 minutes!

## 📦 Installation

### Option 1: Clone from GitHub
```bash
git clone https://github.com/iakash07/ai-media-generator-pro.git
cd ai-media-generator-pro
npm install
npm run dev
```

### Option 2: Use StackBlitz (Instant)
Click here to open in StackBlitz: [Open Project](https://stackblitz.com/fork/node)

## 🔑 Get Your API Keys

### 1. OpenAI (for Images)
1. Go to https://platform.openai.com
2. Sign up or log in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy your key (starts with `sk-`)

**Cost**: ~$0.04 per HD image

### 2. Runway (for Videos)
1. Go to https://runwayml.com
2. Create an account
3. Go to Settings → API Keys
4. Generate new API key
5. Copy your key

**Cost**: Credits-based, check pricing page

### 3. Stability AI (Optional)
1. Go to https://platform.stability.ai
2. Sign up for account
3. Navigate to API Keys
4. Create new key
5. Copy your key (starts with `sk-`)

**Cost**: ~10 credits per video

### 4. Luma AI (Optional)
1. Go to https://lumalabs.ai
2. Create account
3. Access API section
4. Generate API key
5. Copy your key

**Cost**: Subscription-based

## ⚙️ Configuration

1. **Open the app** in your browser (http://localhost:3000)
2. **Click "API Settings"** button (top right)
3. **Paste your API keys**:
   - OpenAI key for images
   - At least one video provider key
4. **Click "Save & Close"**

Your keys are stored locally in your browser - they never leave your device!

## 🎨 Generate Your First Image

1. **Select "Image Generation"** mode
2. **Enter a prompt**:
   ```
   A majestic dragon flying over a medieval castle at sunset, 
   cinematic lighting, highly detailed
   ```
3. **Choose settings**:
   - Style: Vivid (more dramatic) or Natural (more realistic)
   - Size: 1024x1024 (square) or landscape options
4. **Click "Generate Image"**
5. **Wait 10-30 seconds**
6. **Download your image!**

## 🎬 Generate Your First Video

### Text-to-Video
1. **Select "Text-to-Video"** mode
2. **Choose video model**: Runway or Luma
3. **Enter description**:
   ```
   A butterfly with iridescent wings flying through a magical 
   forest with glowing mushrooms, slow motion, cinematic
   ```
4. **Click "Generate Video"**
5. **Wait 30-120 seconds** (videos take longer!)
6. **Watch and download!**

### Image-to-Video
1. **Select "Image-to-Video"** mode
2. **Upload an image** (your photo or generated image)
3. **Add animation instructions** (optional):
   ```
   Camera slowly zooms in, gentle parallax effect
   ```
4. **Choose video model**
5. **Click "Generate Video"**
6. **Wait and enjoy!**

## 💡 Pro Tips

### For Better Images
- **Be specific**: "A red sports car" → "A sleek red Ferrari F40 on a mountain road at golden hour"
- **Add style keywords**: "cinematic", "highly detailed", "photorealistic", "oil painting"
- **Specify lighting**: "soft lighting", "dramatic shadows", "golden hour"
- **Use HD quality**: Always enabled for best results

### For Better Videos
- **Keep it simple**: Complex scenes may not work well
- **Describe motion**: "camera pans left", "zooms in slowly"
- **Set the mood**: "cinematic", "dreamy", "fast-paced"
- **Start with images**: Image-to-video often gives better results

### Cost Optimization
- **Test with images first**: Much cheaper than videos
- **Use Runway Turbo**: Faster and uses fewer credits
- **Batch similar requests**: Generate multiple variations at once
- **Monitor usage**: Check your API dashboard regularly

## 🐛 Troubleshooting

### "Please add your API key"
- Click API Settings
- Make sure you pasted the complete key
- Click "Save & Close"
- Try again

### "Failed to generate image"
- Check your OpenAI account has credits
- Verify API key is correct
- Try a different prompt (may violate content policy)
- Check OpenAI status page

### "Video generation timed out"
- Videos can take up to 2 minutes
- Try a simpler prompt
- Switch to a different video provider
- Check your account credits

### Image upload not working
- Ensure file is under 10MB
- Use PNG, JPG, or WebP format
- Try a different image
- Check browser console for errors

## 📊 Understanding Costs

### OpenAI DALL-E 3
- **Standard Quality**: $0.040 per image
- **HD Quality**: $0.080 per image
- Our app uses HD by default

### Runway Gen-3
- **Turbo**: ~5 credits per 5-second video
- **Standard**: ~10 credits per 5-second video
- Check your plan for credit costs

### Stability AI
- **Image-to-Video**: ~10 credits per video
- Free tier: 25 credits/month
- Paid plans available

### Luma AI
- Subscription-based pricing
- Free tier available with limits
- Check website for current pricing

## 🎯 Example Prompts

### Images
```
1. A cozy coffee shop interior with warm lighting, 
   plants, and people working on laptops

2. Futuristic cyberpunk city at night with neon signs, 
   rain-slicked streets, flying cars

3. A serene Japanese garden with cherry blossoms, 
   koi pond, and traditional architecture

4. Abstract geometric pattern in vibrant colors, 
   modern art style, high contrast
```

### Videos
```
1. Ocean waves crashing on a beach at sunset, 
   slow motion, peaceful atmosphere

2. Time-lapse of clouds moving over mountains, 
   dramatic lighting changes

3. A hummingbird hovering near a flower, 
   macro shot, vibrant colors

4. City traffic at night with light trails, 
   time-lapse effect
```

## 🔄 Workflow Examples

### Create a Product Showcase
1. Generate product image with DALL-E
2. Download the image
3. Upload to Image-to-Video
4. Add "camera rotates around product" prompt
5. Generate video
6. Use in marketing!

### Make Social Media Content
1. Generate eye-catching image
2. Use vivid style for more impact
3. Download in square format (1024x1024)
4. Post to Instagram/Facebook
5. Or convert to video for Reels/TikTok

### Design Iteration
1. Generate initial concept
2. Download and edit if needed
3. Upload edited version
4. Use image editing mode to refine
5. Repeat until perfect

## 📱 Browser Compatibility

✅ **Fully Supported**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

⚠️ **Limited Support**:
- Older browsers may have issues
- Mobile browsers work but slower

## 🔐 Privacy & Security

- ✅ API keys stored locally only
- ✅ No server-side key storage
- ✅ Direct API calls (no proxy)
- ✅ No data collection
- ✅ Open source code

## 📚 Next Steps

1. **Read the full README**: More detailed information
2. **Check API_DOCUMENTATION.md**: Deep dive into APIs
3. **Experiment**: Try different prompts and settings
4. **Join community**: Share your creations
5. **Contribute**: Submit PRs for improvements

## 🆘 Need Help?

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check README and API docs
- **API Support**: Contact provider directly
- **Community**: Share tips and tricks

## 🎉 You're Ready!

Start creating amazing AI-generated images and videos. Have fun and be creative!

---

**Happy Generating! 🚀**

Made with ❤️ by the AI Media Generator Pro team
