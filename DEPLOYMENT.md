# 🚀 Deployment Guide

Complete guide to deploy AI Media Generator Pro with server-side API keys.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier works)
- API keys from providers

## 🔑 Get Your API Keys

### 1. OpenAI (Required for Images)
1. Go to https://platform.openai.com
2. Sign up or log in
3. Navigate to API Keys
4. Create new secret key
5. Copy the key (starts with `sk-`)

### 2. Runway (Optional - for Videos)
1. Go to https://runwayml.com
2. Create account
3. Go to Settings → API Keys
4. Generate new key
5. Copy the key

### 3. Stability AI (Optional - for Videos)
1. Go to https://platform.stability.ai
2. Sign up
3. Navigate to API Keys
4. Create new key
5. Copy the key (starts with `sk-`)

### 4. Luma AI (Optional - for Videos)
1. Go to https://lumalabs.ai
2. Create account
3. Access API section
4. Generate key
5. Copy the key

## 🌐 Deploy to Vercel (Recommended)

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iakash07/ai-media-generator-pro)

1. Click the button above
2. Sign in to Vercel
3. Import the repository
4. Add environment variables (see below)
5. Click "Deploy"

### Method 2: Manual Deploy

1. **Fork or Clone the Repository**
   ```bash
   git clone https://github.com/iakash07/ai-media-generator-pro.git
   cd ai-media-generator-pro
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Add Environment Variables**
   - Go to your project on Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add the following:

   ```
   OPENAI_API_KEY=sk-your-openai-key
   RUNWAY_API_KEY=your-runway-key
   STABILITY_API_KEY=sk-your-stability-key
   LUMA_API_KEY=your-luma-key
   ```

6. **Redeploy**
   ```bash
   vercel --prod
   ```

## 🐳 Deploy with Docker

### Build Docker Image

```bash
docker build -t ai-media-generator .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-key \
  -e RUNWAY_API_KEY=your-key \
  -e STABILITY_API_KEY=sk-your-key \
  -e LUMA_API_KEY=your-key \
  ai-media-generator
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - RUNWAY_API_KEY=${RUNWAY_API_KEY}
      - STABILITY_API_KEY=${STABILITY_API_KEY}
      - LUMA_API_KEY=${LUMA_API_KEY}
```

Run:
```bash
docker-compose up
```

## ☁️ Deploy to Other Platforms

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Railway

1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### AWS Amplify

1. Connect repository
2. Configure build settings
3. Add environment variables
4. Deploy

## 🔒 Environment Variables

### Required Variables

```bash
# Minimum required for images
OPENAI_API_KEY=sk-your-openai-key-here
```

### Optional Variables (for videos)

```bash
# Add at least one for video generation
RUNWAY_API_KEY=your-runway-key-here
STABILITY_API_KEY=sk-your-stability-key-here
LUMA_API_KEY=your-luma-key-here
```

### Setting Environment Variables

#### Vercel
```bash
vercel env add OPENAI_API_KEY
# Enter your key when prompted
```

#### Local Development
Create `.env.local`:
```bash
OPENAI_API_KEY=sk-your-key
RUNWAY_API_KEY=your-key
STABILITY_API_KEY=sk-your-key
LUMA_API_KEY=your-key
```

## 🧪 Testing Deployment

### 1. Test Image Generation
- Open your deployed URL
- Select "Image Generation"
- Enter a prompt
- Click "Generate Image"
- Should work within 10-30 seconds

### 2. Test Video Generation
- Select "Text to Video"
- Choose a video model
- Enter description
- Click "Generate Video"
- Should complete in 30-120 seconds

### 3. Check API Routes
Visit these endpoints to verify:
- `https://your-domain.com/api/generate-image` (POST)
- `https://your-domain.com/api/generate-video` (POST)
- `https://your-domain.com/api/check-video-status` (POST)

## 🐛 Troubleshooting Deployment

### "API key not configured on server"

**Solution**: Add environment variables in your hosting platform

### Build Fails

**Check**:
- Node version (use 18+)
- All dependencies installed
- No syntax errors

### API Routes Not Working

**Verify**:
- Environment variables are set
- API keys are correct
- Routes are in `app/api/` directory

### Slow Performance

**Optimize**:
- Enable caching
- Use CDN for static assets
- Upgrade hosting plan

## 💰 Cost Estimation

### Vercel (Hosting)
- **Free Tier**: 100GB bandwidth/month
- **Pro**: $20/month for more resources

### API Costs (per generation)

**Images (OpenAI)**:
- Standard: $0.040 per image
- HD: $0.080 per image

**Videos**:
- Runway: ~$0.05-0.10 per 5-second video
- Stability: ~10 credits per video
- Luma: Subscription-based

### Monthly Cost Example

For 1000 users generating:
- 5000 images: ~$400
- 1000 videos: ~$50-100

**Total**: ~$450-500/month

## 🔐 Security Best Practices

### 1. Protect API Keys
- Never commit to Git
- Use environment variables
- Rotate keys regularly

### 2. Rate Limiting
Add rate limiting to prevent abuse:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Implement rate limiting logic
  return NextResponse.next();
}
```

### 3. Authentication (Optional)
Add user authentication:
- NextAuth.js
- Clerk
- Auth0

### 4. Usage Monitoring
- Track API usage
- Set spending limits
- Monitor for abuse

## 📊 Monitoring

### Vercel Analytics
Enable in dashboard for:
- Page views
- Performance metrics
- Error tracking

### API Monitoring
Track:
- Request count
- Response times
- Error rates
- API costs

## 🔄 Updates & Maintenance

### Update Dependencies
```bash
npm update
npm audit fix
```

### Deploy Updates
```bash
git push origin main
# Vercel auto-deploys
```

### Rollback
```bash
vercel rollback
```

## 🎯 Production Checklist

- [ ] All API keys added to environment variables
- [ ] Environment variables verified
- [ ] Test image generation works
- [ ] Test video generation works
- [ ] Error handling tested
- [ ] Rate limiting implemented (optional)
- [ ] Monitoring enabled
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Analytics enabled

## 📞 Support

### Deployment Issues
- Check Vercel logs
- Review build output
- Test API routes directly

### API Issues
- Verify keys are correct
- Check provider status pages
- Review API documentation

## 🎉 You're Live!

Your AI Media Generator Pro is now deployed and accessible to everyone!

**Next Steps**:
1. Share your URL
2. Monitor usage
3. Gather feedback
4. Iterate and improve

---

**Need Help?** Open an issue on GitHub or check the troubleshooting guide.
