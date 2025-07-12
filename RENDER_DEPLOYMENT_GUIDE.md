# Render Deployment Guide for Sameer's Portfolio with AI Modal

## 🚀 Quick Deploy to Render

Your portfolio with AI modal can be deployed to Render! Here's how to do it:

## 📋 Prerequisites

1. **GitHub Account**: Your code should be on GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas**: For database (free tier available)
4. **Google AI Studio**: For Gemini API key (free tier available)

## 🎯 Deployment Strategy

### Option 1: Full Stack Deployment (Recommended)

Deploy both frontend and backend together:

1. **Connect to GitHub**:
   - Go to Render Dashboard
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Select the repository with your portfolio

2. **Render will automatically detect the `render.yaml`** and create both services:
   - Backend service (Node.js)
   - Frontend service (Static site)

3. **Configure Environment Variables**:

   **For Backend Service**:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `GEMINI_API_KEY`: Your Google AI Studio API key
   - `CORS_ORIGIN`: Your frontend URL (auto-filled)

   **For Frontend Service**:
   - `VITE_BACKEND_URL`: Your backend URL (auto-filled)

## 🔧 Environment Variables Setup

### Backend Environment Variables (in Render Dashboard):

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=https://sameer-portfolio-frontend.onrender.com
```

### Frontend Environment Variables (in Render Dashboard):

```env
NODE_ENV=production
VITE_BACKEND_URL=https://sameer-portfolio-backend.onrender.com
```

## 🤖 AI Modal Configuration

Your AI modal will work with **Gemini** in production:

1. **Get Gemini API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Create a new API key
   - Add it to your backend environment variables

2. **AI Service Priority**:
   - Primary: Gemini (cloud-based, works on Render)
   - Fallback: Intelligent fallback responses
   - Ollama: Local only (not used in production)

3. **Features Available**:
   - ✅ Chat with SAM AI
   - ✅ Conversation history
   - ✅ Context-aware responses
   - ✅ Fallback responses if AI is unavailable

## 🌐 Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Render dashboard, go to your frontend service
   - Click "Settings" → "Custom Domains"
   - Add your domain

2. **DNS Configuration**:
   - Point your domain to Render's nameservers
   - Or add CNAME record pointing to your Render URL

## 🔍 Testing Your Deployment

1. **Frontend**: Visit your Render URL
2. **Backend**: Test API endpoints at `/api/health`
3. **AI Chat**: Test chat functionality in the modal
4. **Database**: Verify chat history persistence

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check build logs in Render dashboard
   - Verify all dependencies are in package.json

2. **Environment Variables**:
   - Ensure all required env vars are set
   - Check for typos in variable names

3. **CORS Issues**:
   - Verify CORS_ORIGIN matches your frontend URL
   - Check backend logs for CORS errors

4. **AI Service Issues**:
   - Verify GEMINI_API_KEY is correct
   - Check if fallback service is working
   - Monitor backend logs for AI errors

5. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check network access settings

## 📱 Performance Optimization

1. **Enable Caching**:
   - Static assets are automatically cached
   - Consider CDN for better performance

2. **Image Optimization**:
   - Use WebP format where possible
   - Compress images before upload

3. **Code Splitting**:
   - Vite handles this automatically
   - Monitor bundle sizes

## 🔒 Security Considerations

1. **Environment Variables**:
   - Never commit API keys to Git
   - Use Render's environment variable system

2. **HTTPS**:
   - Render provides SSL certificates automatically
   - Always use HTTPS in production

3. **API Security**:
   - CORS is configured for your frontend domain
   - Rate limiting is enabled
   - Input validation is in place

## 📊 Monitoring

1. **Render Dashboard**:
   - Monitor uptime and performance
   - Check build logs regularly

2. **Error Tracking**:
   - Monitor backend logs for AI service errors
   - Check frontend console for API errors

## 🎉 Success!

Once deployed, your portfolio with AI modal will be live at:
- Frontend: `https://sameer-portfolio-frontend.onrender.com`
- Backend: `https://sameer-portfolio-backend.onrender.com`

## 🔄 Continuous Deployment

Render automatically deploys when you push to your main branch. To update:
1. Make changes locally
2. Push to GitHub
3. Render automatically rebuilds and deploys

## 💡 Pro Tips

1. **Use Render's Free Tier**:
   - Static sites are always free
   - Web services have free tier limits

2. **Optimize for Performance**:
   - Minimize bundle size
   - Use lazy loading for components

3. **Backup Strategy**:
   - Keep local backups
   - Use version control effectively

4. **AI Service Monitoring**:
   - Monitor Gemini API usage
   - Check fallback service logs

## 🆘 Need Help?

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Render Support**: Available in dashboard
- **Community**: Stack Overflow, Reddit r/webdev

---

**Your AI-powered portfolio will work great on Render!** 🚀 