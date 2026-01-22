# 🚀 Vercel Deployment Guide - AI Media Generator Pro

## 🎯 Quick Deploy to Vercel

Your app URL: **https://ai-media-generator-bay.vercel.app/**

---

## ✅ Step-by-Step Deployment

### Method 1: Deploy from GitHub (Recommended)

#### 1. Connect GitHub to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Select your repository: `iakash07/ai-media-generator-pro`
5. Click "Import"

#### 2. Configure Project

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: `./` (leave as default)

**Build Command**: `npm run build` (auto-detected)

**Output Directory**: `.next` (auto-detected)

**Install Command**: `npm install` (auto-detected)

#### 3. Environment Variables (Optional)

**For Free Tier** (Skip this step):
- No environment variables needed!
- App uses Bhindi fallback automatically

**For Premium Quality** (Add these):
```
OPENAI_API_KEY=sk-your-openai-key
RUNWAY_API_KEY=your-runway-key
STABILITY_API_KEY=sk-your-stability-key
LUMA_API_KEY=your-luma-key
```

#### 4. Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. ✅ Your app is live!

---

### Method 2: Deploy with Vercel CLI

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
cd ai-media-generator-pro
vercel

# 4. Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? ai-media-generator-pro
# - Directory? ./
# - Override settings? No

# 5. Deploy to production
vercel --prod
```

---

## 🔧 Troubleshooting Deployment

### Issue 1: Build Fails

**Error**: `Module not found` or `Cannot find module`

**Solution**:
```bash
# 1. Clear dependencies
rm -rf node_modules package-lock.json

# 2. Reinstall
npm install

# 3. Test build locally
npm run build

# 4. If successful, push to GitHub
git add .
git commit -m "Fix dependencies"
git push

# 5. Vercel will auto-redeploy
```

### Issue 2: Deployment Succeeds but Site Shows Error

**Error**: 500 Internal Server Error or blank page

**Solution**:
```bash
# Check Vercel logs
1. Go to Vercel dashboard
2. Click your project
3. Click "Deployments"
4. Click latest deployment
5. Click "View Function Logs"
6. Look for errors

# Common fixes:
# - Add missing environment variables
# - Check API routes are correct
# - Verify all files are committed
```

### Issue 3: Site Not Updating

**Error**: Changes not showing on live site

**Solution**:
```bash
# 1. Force redeploy
# Vercel Dashboard → Deployments → ... → Redeploy

# 2. Or push a new commit
git commit --allow-empty -m "Force redeploy"
git push

# 3. Clear browser cache
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)
```

### Issue 4: Environment Variables Not Working

**Error**: API keys not being read

**Solution**:
```bash
# 1. Check variable names are exact:
OPENAI_API_KEY (not OPENAI_KEY)
RUNWAY_API_KEY (not RUNWAY_KEY)

# 2. Check all environments selected:
☑ Production
☑ Preview
☑ Development

# 3. Redeploy after adding variables:
Deployments → ... → Redeploy
```

---

## 🎯 Verify Deployment

### Check 1: Site Loads
```
1. Open https://ai-media-generator-bay.vercel.app/
2. Should see the app interface
3. No errors in console
```

### Check 2: Image Generation Works
```
1. Enter prompt: "A beautiful sunset"
2. Click "Generate Image"
3. Wait 15-30 seconds
4. ✅ Should generate image (with Bhindi fallback)
```

### Check 3: Video Generation Works
```
1. Select "Text to Video"
2. Enter prompt: "A butterfly flying"
3. Click "Generate Video"
4. Wait 30-60 seconds
5. ✅ Should generate video (with Bhindi fallback)
```

---

## 📊 Deployment Checklist

Before deploying:
- [ ] ✅ Latest code pulled: `git pull origin main`
- [ ] ✅ Dependencies installed: `npm install`
- [ ] ✅ Build works locally: `npm run build`
- [ ] ✅ App runs locally: `npm run dev`
- [ ] ✅ All changes committed: `git status`
- [ ] ✅ Pushed to GitHub: `git push`

After deploying:
- [ ] ✅ Site loads without errors
- [ ] ✅ Image generation works
- [ ] ✅ Video generation works
- [ ] ✅ Image-to-video works
- [ ] ✅ Downloads work
- [ ] ✅ Mobile responsive
- [ ] ✅ No console errors

---

## 🚀 Optimize Deployment

### 1. Enable Analytics
```
Vercel Dashboard → Your Project → Analytics
Enable Web Analytics
```

### 2. Set Up Custom Domain (Optional)
```
Vercel Dashboard → Your Project → Settings → Domains
Add your custom domain
Follow DNS instructions
```

### 3. Configure Caching
```
# Already configured in next.config.js
# Images cached for 1 hour
# API routes cached appropriately
```

### 4. Monitor Performance
```
Vercel Dashboard → Your Project → Analytics
Check:
- Page load times
- API response times
- Error rates
- Traffic patterns
```

---

## 🔒 Security Best Practices

### 1. Environment Variables
```
✅ Store API keys in Vercel environment variables
✅ Never commit .env files to GitHub
✅ Use different keys for production/preview
✅ Rotate keys regularly
```

### 2. API Routes
```
✅ All API keys server-side only
✅ Never expose keys to client
✅ Validate all inputs
✅ Handle errors gracefully
```

### 3. Rate Limiting (Recommended)
```typescript
// Add to API routes
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

---

## 💰 Cost Monitoring

### Vercel Costs
```
Free Tier:
- 100 GB bandwidth/month
- 100 GB-hours compute/month
- Unlimited deployments
- Perfect for testing!

Pro Plan ($20/month):
- 1 TB bandwidth
- 1000 GB-hours compute
- Better for production
```

### API Costs (If Using Premium Keys)
```
OpenAI:
- $0.08 per HD image
- Monitor at: platform.openai.com/usage

Runway:
- ~$0.05-0.10 per video
- Monitor at: runwayml.com/dashboard

Track total costs:
- Set up billing alerts
- Monitor usage daily
- Optimize as needed
```

---

## 🎯 Production Checklist

Before going live:
- [ ] ✅ Test all features thoroughly
- [ ] ✅ Add error tracking (Sentry, etc.)
- [ ] ✅ Set up monitoring (Vercel Analytics)
- [ ] ✅ Configure rate limiting
- [ ] ✅ Add usage analytics
- [ ] ✅ Set up billing alerts
- [ ] ✅ Create backup plan
- [ ] ✅ Document API usage
- [ ] ✅ Test on multiple devices
- [ ] ✅ Test on multiple browsers

---

## 🆘 Common Deployment Errors

### Error: "Build failed"
```
Solution:
1. Check build logs in Vercel
2. Test build locally: npm run build
3. Fix any TypeScript errors
4. Commit and push fixes
```

### Error: "Function timeout"
```
Solution:
1. Increase timeout in vercel.json:
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
2. Optimize API calls
3. Add caching
```

### Error: "Module not found"
```
Solution:
1. Check package.json has all dependencies
2. Run: npm install
3. Commit package-lock.json
4. Push to GitHub
```

### Error: "Environment variable not found"
```
Solution:
1. Add to Vercel: Settings → Environment Variables
2. Select all environments
3. Redeploy
```

---

## 📚 Useful Commands

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Pull environment variables
vercel env pull

# Add environment variable
vercel env add OPENAI_API_KEY

# Remove deployment
vercel rm [deployment-url]

# Promote deployment to production
vercel promote [deployment-url]
```

---

## 🎉 Post-Deployment

### Share Your App
```
Your live URL: https://ai-media-generator-bay.vercel.app/

Share on:
- Twitter/X
- LinkedIn
- Product Hunt
- Reddit
- Hacker News
```

### Monitor Usage
```
1. Vercel Analytics
2. API usage dashboards
3. Error tracking
4. User feedback
```

### Iterate
```
1. Collect user feedback
2. Fix bugs
3. Add features
4. Optimize performance
5. Scale as needed
```

---

## 🚀 Next Steps

1. **Deploy Now**:
   ```bash
   vercel --prod
   ```

2. **Test Everything**:
   - Image generation
   - Video generation
   - Image-to-video
   - Downloads

3. **Monitor**:
   - Check Vercel Analytics
   - Monitor API usage
   - Track errors

4. **Optimize**:
   - Add caching
   - Optimize images
   - Reduce bundle size

5. **Scale**:
   - Add premium keys as needed
   - Upgrade Vercel plan if needed
   - Implement rate limiting

---

## 📞 Support

### Vercel Support
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Status: https://www.vercel-status.com

### Project Support
- GitHub Issues: https://github.com/iakash07/ai-media-generator-pro/issues
- Documentation: See README.md

---

**🎉 Your app is ready to deploy!**

**🚀 Run `vercel --prod` and go live!**

**⭐ Don't forget to star the repo!**

---

**Made with ❤️ - Happy Deploying!** 🚀✨
