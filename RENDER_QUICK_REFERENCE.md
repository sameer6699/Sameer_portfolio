# Render Deployment Quick Reference

## 🚀 Quick Deploy Steps

### 1. Prerequisites
- [ ] GitHub repository with your code
- [ ] MongoDB Atlas account & cluster
- [ ] Google AI Studio (Gemini) API key
- [ ] Render account

### 2. Environment Variables

#### Backend (in Render Dashboard)
```
NODE_ENV=production
PORT=10000
GEMINI_API_KEY=your_gemini_api_key
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
FRONTEND_URL=https://sameer-portfolio-frontend.onrender.com
ABUSE_DETECTION_ENABLED=true
MAX_REQUESTS_PER_MINUTE=60
```

#### Frontend (in Render Dashboard)
```
VITE_BACKEND_URL=https://sameer-portfolio-backend.onrender.com
```

### 3. Deployment URLs
- **Backend**: `https://sameer-portfolio-backend.onrender.com`
- **Frontend**: `https://sameer-portfolio-frontend.onrender.com`
- **Health Check**: `https://sameer-portfolio-backend.onrender.com/api/chat/health/full`

### 4. Test Endpoints
```bash
# Health check
curl https://sameer-portfolio-backend.onrender.com/api/chat/health/full

# Test chat
curl -X POST https://sameer-portfolio-backend.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

### 5. Common Issues & Solutions

#### Build Failures
- Check build logs in Render dashboard
- Ensure all dependencies in package.json
- Verify TypeScript compilation

#### CORS Issues
- Verify FRONTEND_URL in backend environment
- Check frontend URL matches exactly

#### Database Connection
- Verify MongoDB Atlas connection string
- Check network access (allow from anywhere)
- Ensure database user has correct permissions

#### API Key Issues
- Verify Gemini API key is correct
- Check API key permissions in Google AI Studio

### 6. Monitoring
- **Render Dashboard**: Service health & logs
- **MongoDB Atlas**: Database performance
- **Google AI Studio**: API usage & quotas

### 7. Free Tier Limits
- **Render**: 750 hours/month
- **MongoDB Atlas**: 512MB storage
- **Google AI**: Check current pricing

### 8. Support Links
- [Render Documentation](https://docs.render.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Google AI Documentation](https://ai.google.dev)

---

**Remember**: Never commit API keys to Git! Use Render's environment variables. 