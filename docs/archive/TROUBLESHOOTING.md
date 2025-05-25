# 🔧 LANDING PAGE TROUBLESHOOTING GUIDE

## 🚨 Common Issues & Solutions

### Issue: "Cannot resolve module" errors
**Symptoms**: Import errors in console, components not loading
**Solution**: 
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: CTA button still not visible
**Symptoms**: Button appears transparent or hard to see
**Check**: `app/components/sections/HeroSection.tsx` line ~239
**Should be**: `bg-photonique-coral hover:bg-photonique-dark-coral`
**Fix**: Replace gradient backgrounds with solid coral color

### Issue: Product showcase not rendering
**Symptoms**: DeviceSpotlight section is missing
**Causes**: 
1. Product handle doesn't exist in Shopify
2. Shopify API connection issues

**Solutions**:
1. Check your Shopify product handle:
   - Go to Shopify admin
   - Find your product
   - Check the handle in the URL/SEO section
   - Update `app/routes/($locale)/_index.tsx` line 48

2. Verify Shopify connection:
   - Check `.env` file has correct SHOPIFY_STOREFRONT_ACCESS_TOKEN
   - Ensure your store domain is correct

### Issue: Video not playing in hero section
**Symptoms**: Black screen or no video in hero
**Solutions**:
1. Check if video file exists: `/public/hair-homepage.mp4`
2. Add your actual video file to the public directory
3. Temporary workaround: Replace video with image background

### Issue: Slow loading or timeouts
**Symptoms**: Long loading times, components not appearing
**Solutions**:
1. Increase development server timeout:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run dev
   ```
2. Check for circular dependencies
3. Verify all imports use `~/components/` format

### Issue: Mobile layout problems
**Symptoms**: Elements overlapping or too small on mobile
**Solutions**:
1. Test responsive classes are working
2. Check Tailwind CSS is loading properly
3. Verify viewport meta tag in `app/root.tsx`

### Issue: Build fails
**Symptoms**: `npm run build` returns errors
**Solutions**:
1. Run `npm run typecheck` to find TypeScript errors
2. Check for unused imports
3. Verify all components export properly
4. Clear build cache: `rm -rf .cache dist`

## 🔍 Debugging Commands

```bash
# Check TypeScript errors
npm run typecheck

# Test build process
npm run build

# Run with debug info
DEBUG=hydrogen npm run dev

# Check package dependencies
npm ls --depth=0

# Verify Tailwind is working
npm run dev -- --inspect
```

## 📞 Getting Help

If issues persist:
1. Check browser console for JavaScript errors
2. Look at terminal output for build errors
3. Verify all environment variables are set
4. Test with a fresh browser window (clear cache)

## 🎯 Quick Wins

These changes will immediately improve your landing page:

1. **Add real video file** to `/public/hair-homepage.mp4`
2. **Update product handle** to match your Shopify product
3. **Test on multiple devices** to ensure responsiveness
4. **Check loading performance** with browser dev tools

Your landing page foundation is solid - most issues are configuration-related and easily fixable! 🚀
