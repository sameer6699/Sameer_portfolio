# Deployment Guide for Portfolio Chat Backend

This guide will help you deploy your backend with Ollama integration so your portfolio chat works on Vercel.

## 🚀 Quick Solution: Deploy to Railway (Recommended)

### Step 1: Prepare Backend for Deployment

1. **Add a start script** to your backend's `package.json`:
   ```json
   {
     "scripts": {
       "dev": "nodemon src/server.ts",
       "build": "tsc",
       "start": "node dist/server.js",
       "postinstall": "npm run build"
     }
   }
   ```

2. **Create a `railway.json`** file in your backend directory:
   ```json
   {
     "build": {
       "builder": "nixpacks"
     },
     "deploy": {
       "startCommand": "npm start",
       "healthcheckPath": "/api/chat/health",
       "healthcheckTimeout": 300,
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

### Step 2: Deploy to Railway

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

4. **Initialize Railway project**:
   ```bash
   railway init
   ```

5. **Deploy**:
   ```bash
   railway up
   ```

6. **Get your deployment URL**:
   ```bash
   railway domain
   ```

### Step 3: Configure Environment Variables

In Railway dashboard, add these environment variables:
```
OLLAMA_BASE_URL=https://your-ollama-instance.railway.app
OLLAMA_MODEL=llama2
PORT=5000
MONGODB_URI=your-mongodb-uri (if using MongoDB)
```

### Step 4: Update Frontend

1. **Create `.env` file** in your project root:
   ```
   VITE_BACKEND_URL=https://your-railway-app.railway.app
   ```

2. **Add environment variable to Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add: `VITE_BACKEND_URL` = `https://your-railway-app.railway.app`

3. **Redeploy your frontend**:
   ```bash
   git add .
   git commit -m "Add backend URL configuration"
   git push
   ```

## 🔧 Alternative Solutions

### Option A: Render Deployment

1. **Create account** at [render.com](https://render.com)
2. **Create new Web Service**
3. **Connect GitHub repository**
4. **Configure**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables: Same as Railway

### Option B: Use Cloud Ollama Services

Instead of running Ollama locally, use cloud services:

1. **Ollama Cloud** (https://ollama.ai/cloud)
2. **Together AI** (https://together.ai)
3. **Update your backend** to use their APIs instead of local Ollama

### Option C: Vercel Functions (Limited)

You can create Vercel API routes, but they have limitations:
- No persistent storage for sessions
- Limited execution time
- Need to use external AI services

## 🧪 Testing Your Deployment

1. **Test backend health**:
   ```bash
   curl https://your-backend-url.railway.app/api/chat/health
   ```

2. **Test chat endpoint**:
   ```bash
   curl -X POST https://your-backend-url.railway.app/api/chat \
     -H "Content-Type: application/json" \
     -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
   ```

3. **Test from your portfolio**:
   - Open your deployed portfolio
   - Try the chat functionality
   - Check browser console for errors

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Backend already has CORS configured
   - Make sure your frontend URL is allowed

2. **Connection Refused**:
   - Check if backend is running
   - Verify the URL in environment variables

3. **Ollama Not Found**:
   - Make sure Ollama is running on the deployed instance
   - Check if the model is pulled

4. **Environment Variables Not Working**:
   - Restart your Vercel deployment
   - Check variable names (must start with `VITE_`)

### Debug Steps:

1. **Check backend logs**:
   ```bash
   railway logs
   ```

2. **Check frontend console**:
   - Open browser dev tools
   - Look for network errors

3. **Test endpoints manually**:
   - Use Postman or curl to test API directly

## 📝 Environment Variables Reference

### Frontend (.env):
```
VITE_BACKEND_URL=https://your-backend-url.railway.app
```

### Backend (Railway/Render):
```
OLLAMA_BASE_URL=https://your-ollama-instance.railway.app
OLLAMA_MODEL=llama2
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

## 🎯 Final Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Environment variables configured
- [ ] Frontend environment variable set
- [ ] Vercel deployment updated
- [ ] Chat functionality tested
- [ ] Error handling working

## 💡 Pro Tips

1. **Use Railway's free tier** for testing
2. **Monitor your usage** to avoid costs
3. **Set up automatic deployments** from GitHub
4. **Use environment-specific configurations**
5. **Test thoroughly** before going live

Your chat should work perfectly once you follow these steps! 🚀 