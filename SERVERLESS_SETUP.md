# 🚀 Serverless Setup Guide

Complete guide to set up AI Media Generator Pro with server-side API keys so **everyone can use it without their own API keys**.

## 🎯 Overview

This setup allows you to:
- ✅ Deploy once with your API keys
- ✅ Let anyone use the app for free
- ✅ Control costs and usage
- ✅ No user configuration needed

## 📋 What You Need

1. **Hosting Account** (choose one):
   - Vercel (recommended, free tier available)
   - Netlify
   - Railway
   - Your own server

2. **API Keys** (at minimum):
   - OpenAI API key (for images) - **Required**
   - At least one video provider (optional):
     - Runway API key
     - Stability AI API key
     - Luma AI API key

## 🔑 Step 1: Get API Keys

### OpenAI (Required)
1. Go to https://platform.openai.com
2. Sign up or log in
3. Click "API Keys" in sidebar
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. **Save it securely** - you won't see it again!

**Cost**: ~$0.08 per HD image

### Runway (Optional - for videos)
1. Go to https://runwayml.com
2. Create account
3. Go to Settings → API Keys
4. Generate new key
5. Copy and save

**Cost**: Credits-based, ~$0.05-0.10 per 5-second video

### Stability AI (Optional - for videos)
1. Go to https://platform.stability.ai
2. Sign up
3. Navigate to API Keys
4. Create new key
5. Copy and save (starts with `sk-`)

**Cost**: ~10 credits per video

### Luma AI (Optional - for videos)
1. Go to https://lumalabs.ai
2. Create account
3. Access API section
4. Generate key
5. Copy and save

**Cost**: Subscription-based

## 🌐 Step 2: Deploy to Vercel (Easiest)

### Option A: One-Click Deploy

1. **Click this button**:
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iakash07/ai-media-generator-pro)

2. **Sign in to Vercel** (free account)

3. **Import the repository**
   - Give it a name
   - Click "Create"

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add these variables:
   
   ```
   Name: OPENAI_API_KEY
   Value: sk-your-actual-openai-key
   
   Name: RUNWAY_API_KEY (optional)
   Value: your-runway-key
   
   Name: STABILITY_API_KEY (optional)
   Value: sk-your-stability-key
   
   Name: LUMA_API_KEY (optional)
   Value: your-luma-key
   ```

5. **Click "Deploy"**
   - Wait 2-3 minutes
   - Your app is live!

6. **Get Your URL**:
   - Vercel gives you a URL like: `your-app.vercel.app`
   - Share this with anyone!

### Option B: Manual Deploy

```bash
# 1. Clone the repository
git clone https://github.com/iakash07/ai-media-generator-pro.git
cd ai-media-generator-pro

# 2. Install Vercel CLI
npm install -g vercel

# 3. Login to Vercel
vercel login

# 4. Deploy
vercel

# 5. Add environment variables
vercel env add OPENAI_API_KEY
# Enter your key when prompted

vercel env add RUNWAY_API_KEY
# Enter your key when prompted

# 6. Deploy to production
vercel --prod
```

## 🐳 Step 3: Deploy with Docker (Advanced)

### Using Docker Compose

1. **Create `.env` file**:
```bash
OPENAI_API_KEY=sk-your-key
RUNWAY_API_KEY=your-key
STABILITY_API_KEY=sk-your-key
LUMA_API_KEY=your-key
```

2. **Run with Docker Compose**:
```bash
docker-compose up -d
```

3. **Access at**: http://localhost:3000

### Using Docker Only

```bash
# Build
docker build -t ai-media-generator .

# Run
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key \
  -e RUNWAY_API_KEY=your-key \
  -e STABILITY_API_KEY=sk-your-key \
  -e LUMA_API_KEY=your-key \
  ai-media-generator
```

## ✅ Step 4: Test Your Deployment

### Test Image Generation
1. Open your deployed URL
2. Enter prompt: "A beautiful sunset over mountains"
3. Click "Generate Image"
4. Should work in 10-30 seconds ✅

### Test Video Generation
1. Select "Text to Video"
2. Choose "Runway" model
3. Enter: "A butterfly flying"
4. Click "Generate Video"
5. Should work in 30-120 seconds ✅

## 🔒 Step 5: Secure Your Deployment

### 1. Keep API Keys Secret
- ✅ Never commit to Git
- ✅ Use environment variables only
- ✅ Don't share in screenshots
- ✅ Rotate regularly

### 2. Monitor Usage
- Check API provider dashboards
- Set up billing alerts
- Track costs daily

### 3. Add Rate Limiting (Optional)
Prevent abuse by limiting requests:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map();

export function middleware(request: NextRequest) {
  const ip = request.ip || 'unknown';
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 10; // 10 requests per minute

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, []);
  }

  const requests = rateLimit.get(ip).filter((time: number) => now - time < windowMs);
  
  if (requests.length >= maxRequests) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  requests.push(now);
  rateLimit.set(ip, requests);

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

## 💰 Step 6: Manage Costs

### Set Spending Limits

**OpenAI**:
1. Go to https://platform.openai.com/account/billing/limits
2. Set monthly budget
3. Enable email alerts

**Runway**:
1. Check dashboard regularly
2. Set up notifications
3. Monitor credit usage

### Cost Optimization Tips

1. **Start with images only** (cheaper)
2. **Add one video provider** (not all)
3. **Monitor daily usage**
4. **Set up alerts** at 50%, 75%, 90%
5. **Consider user authentication** to track usage

### Expected Costs

**Low Usage** (100 generations/day):
- Images: ~$8/day = $240/month
- Videos: ~$5/day = $150/month
- **Total**: ~$390/month

**Medium Usage** (500 generations/day):
- Images: ~$40/day = $1,200/month
- Videos: ~$25/day = $750/month
- **Total**: ~$1,950/month

**High Usage** (1000+ generations/day):
- Consider adding authentication
- Implement usage limits
- Add payment system

## 📊 Step 7: Monitor Your App

### Vercel Analytics
1. Go to your project dashboard
2. Click "Analytics"
3. View:
   - Page views
   - Performance
   - Errors

### API Monitoring
Track in provider dashboards:
- Request count
- Success rate
- Error types
- Costs

### Set Up Alerts
1. **Vercel**: Enable deployment notifications
2. **OpenAI**: Set billing alerts
3. **Email**: Get daily usage reports

## 🎯 Step 8: Share with Users

### Your App is Ready!

Share your URL:
```
https://your-app.vercel.app
```

### What Users Can Do:
- ✅ Generate images instantly
- ✅ Create videos (if enabled)
- ✅ No signup required
- ✅ No API keys needed
- ✅ Free to use

### Promote Your App:
- Share on social media
- Add to your website
- Create demo videos
- Write blog posts

## 🔄 Step 9: Maintain & Update

### Regular Maintenance

**Weekly**:
- Check usage and costs
- Review error logs
- Monitor performance

**Monthly**:
- Rotate API keys
- Update dependencies
- Review analytics

### Update Your App

```bash
# Pull latest changes
git pull origin main

# Deploy updates
vercel --prod
```

### Add New Features

1. Fork the repository
2. Make your changes
3. Test locally
4. Deploy to production

## 🆘 Troubleshooting

### "API key not configured on server"

**Solution**:
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Add missing keys
4. Redeploy

### High Costs

**Solutions**:
1. Add rate limiting
2. Implement authentication
3. Set daily limits
4. Use cheaper models

### Slow Performance

**Solutions**:
1. Upgrade Vercel plan
2. Optimize images
3. Add caching
4. Use CDN

## 📞 Get Help

### Resources
- [Deployment Guide](DEPLOYMENT.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [API Documentation](API_DOCUMENTATION.md)

### Support
- GitHub Issues
- Provider documentation
- Community forums

## 🎉 Success Checklist

- [ ] API keys obtained
- [ ] App deployed to Vercel
- [ ] Environment variables added
- [ ] Image generation tested
- [ ] Video generation tested (if enabled)
- [ ] Billing alerts set up
- [ ] Usage monitoring enabled
- [ ] URL shared with users
- [ ] Costs tracked
- [ ] Maintenance plan created

## 🚀 You're Live!

Your AI Media Generator Pro is now:
- ✅ Deployed and accessible
- ✅ Free for everyone to use
- ✅ Secure with server-side keys
- ✅ Ready to create amazing content

**Share your URL and let people create!** 🎨🎬

---

**Questions?** Open an issue on GitHub or check the documentation.

**Made with ❤️ for the community**
