# 🔑 API Keys Setup - Get Custom AI Videos!

## 🎯 Current Issue

You're seeing the **same demo video** for all prompts because no API keys are configured.

### **Free Tier (Current)**:
- ✅ Works without errors
- ⚠️ Same video for all prompts
- ⚠️ No custom AI generation
- ⚠️ Demo video only

### **With API Keys (Premium)**:
- ✅ Custom videos for each prompt
- ✅ Real AI generation
- ✅ Unique videos every time
- ✅ High quality with sound

---

## 🎬 **Video Generation Options**

### **Option 1: Runway ML** (Recommended)
**Best for**: Text-to-video and image-to-video

**Features**:
- ✅ Text-to-video generation
- ✅ Image-to-video animation
- ✅ High quality results
- ✅ Fast generation (30-60 seconds)
- ✅ Good for most use cases

**Cost**: ~$0.05-0.10 per video

**Setup**:
1. Go to: https://runwayml.com/
2. Sign up for account
3. Go to Settings → API Keys
4. Create new API key
5. Copy the key (starts with `rw_`)

**Add to Vercel**:
```
RUNWAY_API_KEY=rw_your_key_here
```

---

### **Option 2: Luma AI**
**Best for**: High-quality cinematic videos

**Features**:
- ✅ Text-to-video generation
- ✅ Image-to-video animation
- ✅ Very high quality
- ✅ Cinematic results
- ✅ Longer videos (up to 5 seconds)

**Cost**: Subscription-based (~$30/month for 30 videos)

**Setup**:
1. Go to: https://lumalabs.ai/
2. Sign up for Dream Machine
3. Go to API settings
4. Generate API key
5. Copy the key

**Add to Vercel**:
```
LUMA_API_KEY=luma_your_key_here
```

---

### **Option 3: Stability AI**
**Best for**: Image-to-video only

**Features**:
- ✅ Image-to-video animation
- ⚠️ Requires input image
- ✅ Good quality
- ✅ Stable results

**Cost**: Credit-based (~10 credits per video)

**Setup**:
1. Go to: https://platform.stability.ai/
2. Sign up for account
3. Go to API Keys
4. Create new key
5. Copy the key (starts with `sk-`)

**Add to Vercel**:
```
STABILITY_API_KEY=sk_your_key_here
```

---

## 🔧 **How to Add API Keys to Vercel**

### **Step 1: Get API Key**
Choose one of the options above and get your API key.

### **Step 2: Add to Vercel**
1. Go to: https://vercel.com/dashboard
2. Click your project: `iakash07-ai-media-generator`
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in sidebar
5. Click **"Add New"**

### **Step 3: Configure Variable**
```
Key: RUNWAY_API_KEY (or LUMA_API_KEY or STABILITY_API_KEY)
Value: your_api_key_here

Select environments:
☑ Production
☑ Preview
☑ Development
```

### **Step 4: Redeploy**
1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes
5. Test your site!

---

## 💰 **Cost Comparison**

### **Free Tier (Current)**:
```
Cost: $0
Videos: Demo video only
Quality: Good (but same video)
Custom: No
Sound: No
Use: Testing only
```

### **Runway ML**:
```
Cost: ~$0.05-0.10 per video
Videos: Custom AI-generated
Quality: High
Custom: Yes, based on prompt
Sound: Optional
Use: Production ready
Example: 100 videos = ~$5-10
```

### **Luma AI**:
```
Cost: ~$30/month (30 videos)
Videos: Custom AI-generated
Quality: Very high (cinematic)
Custom: Yes, based on prompt
Sound: Optional
Use: Premium production
Example: $1 per video
```

### **Stability AI**:
```
Cost: Credit-based (~$10 for 100 videos)
Videos: Image-to-video only
Quality: Good
Custom: Yes, animates your images
Sound: No
Use: Image animation
```

---

## 🎯 **Recommended Setup**

### **For Testing** (Current):
```
No API keys needed
Use demo video
Test the interface
$0 cost
```

### **For Production** (Recommended):
```
Add RUNWAY_API_KEY
Get custom videos
~$0.05-0.10 per video
Best balance of cost/quality
```

### **For Premium** (High Quality):
```
Add LUMA_API_KEY
Get cinematic videos
~$1 per video
Best quality
```

---

## 🧪 **Testing After Adding API Key**

### **Step 1: Add API Key**
Follow steps above to add to Vercel

### **Step 2: Redeploy**
Redeploy your Vercel project

### **Step 3: Test**
```
1. Open: https://iakash07-ai-media-generator.vercel.app/
2. Go to: "Text to Video"
3. Enter: "a butterfly flying through a magical forest"
4. Model: Runway (or whichever you added key for)
5. Click: "Generate Video"
6. Wait: 30-60 seconds
7. Result: ✅ Custom AI video based on your prompt!
```

---

## 📊 **What You'll Get**

### **Before (Free Tier)**:
```
Prompt 1: "cat flying" → Demo video (Big Buck Bunny)
Prompt 2: "butterfly" → Demo video (Big Buck Bunny)
Prompt 3: "dragon" → Demo video (Big Buck Bunny)
❌ Same video every time
❌ Not related to prompt
```

### **After (With API Key)**:
```
Prompt 1: "cat flying" → AI video of cat flying ✅
Prompt 2: "butterfly" → AI video of butterfly ✅
Prompt 3: "dragon" → AI video of dragon ✅
✅ Unique video every time
✅ Matches your prompt
✅ High quality
```

---

## 🎬 **Example Prompts to Try**

Once you add API keys, try these:

```
1. "a butterfly flying through a magical forest with glowing flowers"
2. "a dragon soaring over a medieval castle at sunset"
3. "a futuristic car driving through a neon-lit cyberpunk city"
4. "ocean waves crashing on a beach at golden hour"
5. "a spaceship landing on an alien planet"
6. "a cat playing with a ball of yarn in slow motion"
7. "fireworks exploding over a city skyline at night"
```

Each will generate a **unique, custom AI video**! ✅

---

## 🔍 **Verify API Key is Working**

### **Check 1: No Error Messages**
```
Before: "Failed to check video status" ❌
After: "Video generation started with Runway" ✅
```

### **Check 2: Different Videos**
```
Before: Same video every time ❌
After: Different video for each prompt ✅
```

### **Check 3: Generation Time**
```
Before: 5-10 seconds (instant demo) ⚠️
After: 30-60 seconds (real AI generation) ✅
```

### **Check 4: Video Content**
```
Before: Big Buck Bunny (unrelated to prompt) ❌
After: Video matches your prompt ✅
```

---

## 🆘 **Troubleshooting**

### **Issue: Still Getting Demo Video**
```
Solution:
1. Check API key is correct
2. Verify key is added to all environments
3. Redeploy after adding key
4. Clear browser cache
5. Wait 2-3 minutes after redeploy
```

### **Issue: "API Key Invalid" Error**
```
Solution:
1. Check key format (starts with rw_ for Runway)
2. Verify key is active in provider dashboard
3. Check key has credits/quota
4. Try regenerating key
```

### **Issue: Video Takes Too Long**
```
Normal generation times:
- Runway: 30-60 seconds
- Luma: 60-120 seconds
- Stability: 30-90 seconds

If longer:
- Check provider status
- Verify credits available
- Try again later
```

---

## 💡 **Pro Tips**

### **Tip 1: Start with Runway**
- Best balance of cost/quality
- Fast generation
- Good for most use cases

### **Tip 2: Write Good Prompts**
```
Bad: "cat"
Good: "a fluffy orange cat playing with a red ball in a sunny garden"

Bad: "car"
Good: "a sleek red sports car driving on a coastal highway at sunset"
```

### **Tip 3: Monitor Costs**
- Set up billing alerts
- Track usage in provider dashboard
- Start with small tests

### **Tip 4: Use Image-to-Video**
- Generate image first (free with Pollinations)
- Then animate it with video API
- Often better results

---

## 🎉 **Summary**

### **Current State**:
- ✅ App works without errors
- ⚠️ Demo video only (same for all prompts)
- ⚠️ No custom AI generation

### **To Get Custom Videos**:
1. Choose provider (Runway recommended)
2. Sign up and get API key
3. Add to Vercel environment variables
4. Redeploy
5. Generate custom AI videos!

### **Cost**:
- Free tier: $0 (demo only)
- Runway: ~$0.05-0.10 per video
- Luma: ~$1 per video
- Stability: ~$0.10 per video

---

## 📞 **Need Help?**

### **Getting API Keys**:
- Runway: https://runwayml.com/
- Luma: https://lumalabs.ai/
- Stability: https://platform.stability.ai/

### **Documentation**:
- Runway API: https://docs.runwayml.com/
- Luma API: https://docs.lumalabs.ai/
- Stability API: https://platform.stability.ai/docs/

---

**🎬 Add API keys to get custom AI videos based on your prompts!**

**Recommended**: Start with Runway ML (~$0.05-0.10 per video)

**Setup time**: 5 minutes

**Result**: Custom AI videos for every prompt! ✨
