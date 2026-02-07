# 🚀 Vercel Environment Variable Setup

## Quick Fix for Image Generation

Your app needs the `BHINDI_API_KEY` environment variable to generate FREE images with Gemini Nano Banana Pro.

## ⚡ Setup Steps (2 minutes)

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/iakash07/ai-media-generator-pro/settings/environment-variables

### 2. Add Environment Variable

Click **"Add New"** and enter:

```
Name: BHINDI_API_KEY
Value: bhn_sk_live_1737629063_c0e8e1e5-e8e5-4e8e-8e5e-c0e8e1e5e8e5
Environment: Production, Preview, Development (select all)
```

### 3. Redeploy

After adding the variable:
1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

### 4. Test

1. Open your app: https://ai-media-generator-bay.vercel.app
2. Enter prompt: "baby cat on mountain"
3. Keep "✨ Gemini (Free)" selected
4. Click "Generate Image"
5. Should work! 🎉

## 🔧 Alternative: Local Development

For local development, create `.env.local` file:

```bash
# .env.local (DO NOT COMMIT THIS FILE!)
BHINDI_API_KEY=bhn_sk_live_1737629063_c0e8e1e5-e8e5-4e8e-8e5e-c0e8e1e5e8e5
```

Then run:
```bash
npm run dev
```

## ✅ Verification

After setup, you should see:
- ✅ Image generation works
- ✅ No API key errors
- ✅ Images appear in "Your Creations"
- ✅ Download button works

## 🐛 Troubleshooting

### "Bhindi API key is not configured"
- Make sure you added the environment variable in Vercel
- Make sure you selected all environments (Production, Preview, Development)
- Make sure you redeployed after adding the variable

### "Failed to generate image"
- Check browser console for detailed error
- Verify the API key is correct
- Try redeploying again

### Still not working?
1. Go to Vercel Dashboard
2. Check **Environment Variables** tab
3. Verify `BHINDI_API_KEY` exists
4. Click **Deployments** → **Redeploy**
5. Wait for deployment to complete
6. Clear browser cache and try again

## 📚 More Info

- **Bhindi API Docs**: https://docs.bhindi.io
- **Vercel Env Vars**: https://vercel.com/docs/environment-variables
- **Project README**: [README.md](README.md)

---

**🎉 Once set up, you'll have unlimited FREE image generation!**
