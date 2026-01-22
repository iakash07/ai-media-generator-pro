# 🔧 Troubleshooting Guide

Complete solutions for common issues in AI Media Generator Pro.

## 📋 Table of Contents
- [API Key Issues](#api-key-issues)
- [Image Generation Problems](#image-generation-problems)
- [Video Generation Problems](#video-generation-problems)
- [Upload Issues](#upload-issues)
- [Performance Issues](#performance-issues)
- [Browser Compatibility](#browser-compatibility)
- [Network Errors](#network-errors)

---

## 🔑 API Key Issues

### "Please add your API key in settings"

**Cause**: No API key configured for the selected service.

**Solution**:
1. Click the "API Settings" button (top right)
2. Paste your API key in the correct field
3. Click "Save & Close"
4. Try generating again

**Verify**:
- OpenAI keys start with `sk-`
- Runway keys start with `runway_`
- Stability keys start with `sk-`
- Luma keys start with `luma_`

### "Invalid API key" or "401 Unauthorized"

**Cause**: API key is incorrect or expired.

**Solutions**:
1. **Regenerate your key**:
   - Go to the provider's website
   - Delete old key
   - Create new key
   - Update in settings

2. **Check for extra spaces**:
   - Copy key again carefully
   - Paste in a text editor first
   - Remove any spaces or line breaks
   - Then paste into settings

3. **Verify account status**:
   - Check if account is active
   - Verify email if required
   - Check for any restrictions

### Keys not persisting after refresh

**Cause**: Browser localStorage issues.

**Solutions**:
1. **Check browser settings**:
   - Enable cookies and site data
   - Disable "Clear on exit" for this site
   - Allow localStorage

2. **Try incognito/private mode**:
   - If it works there, clear browser cache
   - Reset site permissions

3. **Use different browser**:
   - Test in Chrome, Firefox, or Edge
   - Update browser to latest version

---

## 🎨 Image Generation Problems

### "Failed to generate image"

**Common Causes & Solutions**:

1. **Content Policy Violation**:
   - Prompt contains restricted content
   - Try rephrasing your prompt
   - Avoid violent, adult, or copyrighted content

2. **Insufficient Credits**:
   - Check OpenAI account balance
   - Add credits at platform.openai.com
   - Verify billing information

3. **Rate Limit Exceeded**:
   - Wait 60 seconds
   - Reduce generation frequency
   - Upgrade API tier if needed

4. **Prompt Too Long**:
   - Keep prompts under 4000 characters
   - Be concise but descriptive
   - Remove unnecessary details

### Image quality is poor

**Solutions**:
1. **Use HD quality** (already default in our app)
2. **Be more specific** in your prompt
3. **Add quality keywords**:
   - "highly detailed"
   - "professional photography"
   - "8k resolution"
   - "sharp focus"

### Wrong style or size

**Check**:
- Style setting (Vivid vs Natural)
- Size selection (1024x1024, etc.)
- Prompt doesn't override settings

### Image editing not working

**Requirements**:
1. **Image must be**:
   - PNG format
   - Square dimensions
   - Under 4MB
   - Has transparency (for best results)

2. **Convert your image**:
   - Use online tools to make square
   - Add transparency if needed
   - Compress if over 4MB

---

## 🎬 Video Generation Problems

### "Video generation timed out"

**Cause**: Generation taking longer than expected.

**Solutions**:
1. **Wait longer**:
   - Videos can take 2-3 minutes
   - Don't close the tab
   - Be patient

2. **Simplify prompt**:
   - Use shorter descriptions
   - Reduce complexity
   - Focus on one main action

3. **Try different provider**:
   - Switch from Runway to Luma
   - Or vice versa
   - Each has different speeds

### "Runway API error"

**Common Issues**:

1. **Insufficient Credits**:
   - Check runway.com dashboard
   - Purchase more credits
   - Use Turbo mode (cheaper)

2. **Invalid Image Format**:
   - Use JPG or PNG
   - Keep under 10MB
   - Ensure good quality

3. **Server Overload**:
   - Try again in a few minutes
   - Use off-peak hours
   - Switch to different model

### "Stability AI only supports image-to-video"

**Explanation**: Stability AI cannot do text-to-video.

**Solutions**:
1. **Switch to Image-to-Video mode**
2. **Or use Runway/Luma** for text-to-video
3. **Generate image first**, then animate it

### Luma AI generation failed

**Common Fixes**:

1. **Check API key**:
   - Verify it's correct
   - Regenerate if needed

2. **Account status**:
   - Verify subscription is active
   - Check generation quota
   - Review account limits

3. **Prompt issues**:
   - Avoid copyrighted content
   - Keep descriptions clear
   - Don't use restricted terms

### Video quality is poor

**Improvements**:
1. **Use higher quality source image**
2. **Be specific about camera movement**
3. **Try different video model**
4. **Adjust motion parameters** (if available)

---

## 📤 Upload Issues

### "Please upload a valid image file"

**Solutions**:
1. **Check file format**:
   - Use PNG, JPG, or WebP
   - Avoid HEIC, BMP, or TIFF
   - Convert if necessary

2. **Check file size**:
   - Keep under 10MB
   - Compress large images
   - Use online compression tools

3. **File corruption**:
   - Try different image
   - Re-download original
   - Use different source

### Upload button not responding

**Fixes**:
1. **Refresh the page**
2. **Clear browser cache**
3. **Try different browser**
4. **Check browser console** for errors

### Uploaded image not displaying

**Solutions**:
1. **Wait a moment** for processing
2. **Check image format** compatibility
3. **Try smaller file size**
4. **Refresh and try again**

---

## ⚡ Performance Issues

### App is slow or laggy

**Optimizations**:

1. **Clear browser cache**:
   ```
   Chrome: Ctrl+Shift+Delete
   Firefox: Ctrl+Shift+Delete
   Safari: Cmd+Option+E
   ```

2. **Close other tabs**:
   - Free up memory
   - Reduce CPU usage
   - Improve responsiveness

3. **Update browser**:
   - Use latest version
   - Enable hardware acceleration
   - Clear old data

4. **Check internet speed**:
   - Need stable connection
   - Minimum 5 Mbps recommended
   - Use wired connection if possible

### Generation stuck at "Generating..."

**Solutions**:
1. **Wait 5 minutes** (videos take time)
2. **Check browser console** for errors
3. **Refresh page** and try again
4. **Check API status pages**:
   - status.openai.com
   - Runway status page
   - Provider status pages

### Downloads failing

**Fixes**:
1. **Check browser download settings**
2. **Allow pop-ups** for this site
3. **Try right-click → Save As**
4. **Check disk space**
5. **Disable download managers**

---

## 🌐 Browser Compatibility

### Features not working in Safari

**Known Issues**:
- Some video formats may not play
- Download behavior different

**Solutions**:
1. Use Chrome or Firefox for best experience
2. Update Safari to latest version
3. Enable all website features in settings

### Mobile browser issues

**Limitations**:
- Slower performance
- Upload may be tricky
- Video playback varies

**Recommendations**:
1. Use desktop for best experience
2. If mobile needed, use Chrome
3. Ensure good internet connection
4. Close other apps

### Old browser version

**Symptoms**:
- Styling broken
- Features missing
- Errors in console

**Solution**:
Update to:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🌐 Network Errors

### "Failed to fetch" or "Network error"

**Causes & Solutions**:

1. **Internet Connection**:
   - Check WiFi/Ethernet
   - Test other websites
   - Restart router if needed

2. **Firewall/VPN**:
   - Disable VPN temporarily
   - Check firewall settings
   - Allow API domains

3. **CORS Issues**:
   - This shouldn't happen
   - Try different browser
   - Clear cache and cookies

4. **API Service Down**:
   - Check provider status pages
   - Wait and try again
   - Use alternative provider

### Slow API responses

**Improvements**:
1. **Check internet speed**
2. **Use wired connection**
3. **Try different time** (off-peak)
4. **Switch providers** if persistent

### Request timeout

**Solutions**:
1. **Increase timeout** (code level)
2. **Simplify request** (shorter prompt)
3. **Try again** (temporary issue)
4. **Check API status**

---

## 🐛 Common Error Messages

### "DALL-E Error: Invalid request"
- Check prompt length (< 4000 chars)
- Verify size parameter
- Ensure valid style selection

### "Runway API error: 402"
- Insufficient credits
- Add credits to account
- Check billing status

### "Stability API error: 400"
- Invalid image format
- Image too large
- Missing required parameters

### "Luma API error: 429"
- Rate limit exceeded
- Wait before retrying
- Upgrade plan if needed

---

## 🔍 Debugging Steps

### General Debugging Process:

1. **Check Browser Console**:
   ```
   F12 → Console tab
   Look for red errors
   Copy error message
   ```

2. **Verify API Keys**:
   - Open API Settings
   - Check each key
   - Regenerate if unsure

3. **Test with Simple Request**:
   - Use basic prompt
   - Default settings
   - See if it works

4. **Try Different Provider**:
   - Switch video model
   - Use alternative service
   - Compare results

5. **Clear Everything**:
   - Clear browser cache
   - Clear localStorage
   - Re-enter API keys
   - Try again

---

## 📞 Getting Help

### Before Asking for Help:

1. ✅ Read this troubleshooting guide
2. ✅ Check browser console for errors
3. ✅ Try in different browser
4. ✅ Verify API keys are correct
5. ✅ Check provider status pages

### Where to Get Help:

1. **GitHub Issues**:
   - Report bugs
   - Request features
   - Share solutions

2. **API Provider Support**:
   - OpenAI: help.openai.com
   - Runway: support.runwayml.com
   - Stability: support.stability.ai
   - Luma: support.lumalabs.ai

3. **Community**:
   - Share experiences
   - Learn from others
   - Contribute solutions

### When Reporting Issues:

Include:
- Browser and version
- Error message (exact text)
- Steps to reproduce
- Screenshots if helpful
- Console errors

---

## ✅ Prevention Tips

1. **Keep API keys secure**
2. **Monitor usage regularly**
3. **Update browser frequently**
4. **Test with small requests first**
5. **Save successful prompts**
6. **Backup generated content**
7. **Check provider status before big projects**

---

**Still having issues?** Open an issue on GitHub with details!

Last Updated: January 2026
