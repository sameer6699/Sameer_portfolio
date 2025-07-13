# Vercel Deployment Troubleshooting Guide

## 🚨 Blank Page Issue - Solutions

### 1. Environment Variables (Most Common Cause)

**Problem**: Missing `VITE_BACKEND_URL` environment variable in Vercel.

**Solution**:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   ```
   Name: VITE_BACKEND_URL
   Value: https://sameer-portfolio-backend.onrender.com
   Environment: Production (and Preview if needed)
   ```
4. Redeploy your project

### 2. Build Configuration Issues

**Problem**: Build fails or creates invalid output.

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript compilation

**Quick Fix**:
```bash
# Test build locally first
npm run build
npm run preview
```

### 3. Client-Side Routing Issues

**Problem**: Direct URL access shows blank page.

**Solution**: The `vercel.json` file I created handles this automatically.

### 4. JavaScript Errors

**Problem**: Runtime errors prevent app from loading.

**Solution**:
1. Open browser dev tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests

### 5. Missing Dependencies

**Problem**: Some packages not installed.

**Solution**:
```bash
# Ensure all dependencies are installed
npm install
npm run build
```

## 🔧 Step-by-Step Fix

### Step 1: Set Environment Variables in Vercel

1. **Login to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add these variables**:

```
VITE_BACKEND_URL = https://sameer-portfolio-backend.onrender.com
NODE_ENV = production
```

### Step 2: Redeploy

1. **Trigger a new deployment**:
   ```bash
   git add .
   git commit -m "Fix Vercel deployment issues"
   git push
   ```

2. **Or redeploy from Vercel dashboard**:
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment

### Step 3: Verify Deployment

1. **Check build logs** for any errors
2. **Test the deployed URL**
3. **Open browser dev tools** to check for console errors

## 🐛 Debugging Steps

### 1. Check Build Logs
```bash
# In Vercel dashboard → Deployments → Latest → View Build Logs
```

### 2. Test Locally
```bash
# Test production build locally
npm run build
npm run preview
```

### 3. Check Browser Console
- Open deployed site
- Press F12 → Console tab
- Look for red error messages

### 4. Check Network Requests
- Press F12 → Network tab
- Refresh page
- Look for failed requests (red entries)

## 🔍 Common Error Messages & Solutions

### "Module not found"
**Solution**: Check if all dependencies are in `package.json`

### "VITE_BACKEND_URL is not defined"
**Solution**: Set environment variable in Vercel dashboard

### "Failed to fetch"
**Solution**: Check if backend URL is correct and accessible

### "Cannot read property of undefined"
**Solution**: Check component imports and props

## 📋 Pre-Deployment Checklist

- [ ] All dependencies in `package.json`
- [ ] Environment variables set in Vercel
- [ ] `vercel.json` file present
- [ ] Build works locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] Backend URL is accessible

## 🚀 Quick Fix Commands

```bash
# 1. Test build locally
npm run build
npm run preview

# 2. Check for TypeScript errors
npx tsc --noEmit

# 3. Check for linting errors
npm run lint

# 4. Install missing dependencies
npm install

# 5. Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Still Having Issues?

If you're still experiencing problems:

1. **Check Vercel build logs** for specific error messages
2. **Test backend URL** directly: `https://sameer-portfolio-backend.onrender.com/api/chat/health`
3. **Compare local vs deployed** behavior
4. **Check browser console** for JavaScript errors

## 🎯 Most Likely Solution

Based on your project structure, the most common cause is **missing environment variables**. Set `VITE_BACKEND_URL` in your Vercel project settings and redeploy.

The files I've created (`vercel.json`, updated error handling) should resolve most deployment issues. 