# 🚀 One-Shot Deployment Guide

This guide will help you deploy both your **frontend** and **backend** services to Render in a single deployment using the `render.yaml` blueprint.

## 📋 Prerequisites

Before deploying, make sure you have:

1. ✅ **GitHub Repository** with your code pushed
2. ✅ **Google Gemini API Key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. ✅ **MongoDB Atlas Database** set up (free tier works)
4. ✅ **Render Account** at [render.com](https://render.com)

## 🎯 Quick Start (One-Shot Deployment)

### Step 1: Prepare Your Code

1. **Run the deployment script** to check everything is ready:
   ```bash
   # On Windows:
   deploy-render.bat
   
   # On Mac/Linux:
   ./deploy-render.sh
   ```

2. **Commit and push your code**:
   ```bash
   git add .
   git commit -m "Ready for one-shot Render deployment"
   git push origin main
   ```

### Step 2: Deploy to Render

1. **Go to [Render.com](https://render.com)** and sign in
2. **Click "New +"** → **"Blueprint"**
3. **Connect your GitHub repository**
4. **Render will automatically detect** your `render.yaml` file
5. **Click "Apply"** to deploy both services at once

### Step 3: Configure Environment Variables

After the initial deployment, configure these environment variables in your **Backend Service**:

| Variable | Value | Description |
|----------|-------|-------------|
| `GEMINI_API_KEY` | `your_gemini_api_key` | Your Google Gemini API key |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |

## 🔧 Environment Variables Setup

### Backend Environment Variables

In your Render dashboard, go to your backend service → Environment → Add Environment Variable:

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Sameer_Portfolio
```

### Frontend Environment Variables

The frontend will automatically use the backend URL. No additional configuration needed.

## 📊 What Gets Deployed

### Backend Service (`sameer-portfolio-backend`)
- **Type**: Web Service (Node.js)
- **Plan**: Free
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`
- **Health Check**: `/api/chat/health`
- **URL**: `https://sameer-portfolio-backend.onrender.com`

### Frontend Service (`sameer-portfolio-frontend`)
- **Type**: Static Site
- **Plan**: Free
- **Build Command**: `npm install && npm run build`
- **Publish Path**: `./dist`
- **URL**: `https://sameer-portfolio-frontend.onrender.com`

## 🧪 Testing Your Deployment

### 1. Test Backend Health
```bash
curl https://sameer-portfolio-backend.onrender.com/api/chat/health
```

### 2. Test Frontend
- Visit: `https://sameer-portfolio-frontend.onrender.com`
- Check if the portfolio loads correctly
- Test the chat functionality

### 3. Test Chat API
```bash
curl -X POST https://sameer-portfolio-backend.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
```

## 🔍 Monitoring & Troubleshooting

### Check Deployment Status
1. **Render Dashboard** → Your Services → View Logs
2. **Build Logs**: Check for any build errors
3. **Runtime Logs**: Check for runtime errors

### Common Issues & Solutions

#### 1. Build Failures
- **Issue**: TypeScript compilation errors
- **Solution**: Check `backend/tsconfig.json` and fix any type errors

#### 2. Environment Variable Issues
- **Issue**: API calls failing
- **Solution**: Verify `GEMINI_API_KEY` and `MONGO_URI` are set correctly

#### 3. CORS Issues
- **Issue**: Frontend can't connect to backend
- **Solution**: Backend is already configured with CORS for the frontend URL

#### 4. MongoDB Connection Issues
- **Issue**: Database connection failing
- **Solution**: 
  - Check MongoDB Atlas network access (allow 0.0.0.0/0)
  - Verify connection string format
  - Check username/password

### Health Check Endpoints

- **Basic Health**: `https://sameer-portfolio-backend.onrender.com/api/chat/health`
- **Full Health**: `https://sameer-portfolio-backend.onrender.com/api/chat/health/full`

## 🔄 Auto-Deployment

Both services are configured with `autoDeploy: true`, which means:
- Any push to the `main` branch will trigger automatic redeployment
- Both services will be updated simultaneously
- No manual intervention required

## 💰 Cost Management

- **Free Tier**: Both services use Render's free tier
- **Limitations**: 
  - 750 hours/month for each service
  - Services sleep after 15 minutes of inactivity
  - Cold start takes 30-60 seconds

## 🚀 Performance Optimization

### For Production Use
Consider upgrading to paid plans for:
- **Zero downtime deployments**
- **Faster cold starts**
- **Better performance**
- **Custom domains**

## 📞 Support

If you encounter issues:

1. **Check Render logs** in the dashboard
2. **Verify environment variables** are set correctly
3. **Test endpoints** manually using curl or Postman
4. **Check MongoDB Atlas** connection and network access

## 🎉 Success Checklist

- [ ] Both services deployed successfully
- [ ] Environment variables configured
- [ ] Backend health check passes
- [ ] Frontend loads correctly
- [ ] Chat functionality works
- [ ] MongoDB connection established
- [ ] Gemini API responding

Your portfolio is now live with full chat functionality! 🎊 