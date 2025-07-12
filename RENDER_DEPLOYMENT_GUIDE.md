# Render Deployment Guide for Sameer Portfolio

This guide will help you deploy your portfolio project with AI chat functionality on Render.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account**: For database hosting
4. **Google AI Studio Account**: For Gemini API access

## Step 1: Prepare Your Repository

### 1.1 Update Environment Variables

Create a `.env` file in the backend directory with your production values:

```bash
# Backend/.env
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://sameer-portfolio-frontend.onrender.com
ABUSE_DETECTION_ENABLED=true
MAX_REQUESTS_PER_MINUTE=60
```

### 1.2 Update Frontend Environment

Create a `.env` file in the root directory:

```bash
# .env (root directory)
VITE_BACKEND_URL=https://sameer-portfolio-backend.onrender.com
```

### 1.3 Update CORS Configuration

The backend is already configured to accept requests from the frontend URL.

## Step 2: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**:
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**:
   - Choose the free tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Set Up Database Access**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Render deployment)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `Sameer_Portfolio`

## Step 3: Set Up Google AI Studio (Gemini)

1. **Create Google AI Studio Account**:
   - Go to [aistudio.google.com](https://aistudio.google.com)
   - Sign in with your Google account

2. **Get API Key**:
   - Click on "Get API key" in the top right
   - Create a new API key
   - Copy the API key (you'll need this for the backend)

## Step 4: Deploy on Render

### Method 1: Using render.yaml (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Sign up/Login
   - Click "New +" and select "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables**:
   - In the Render dashboard, go to your backend service
   - Go to "Environment" tab
   - Add the following environment variables:
     - `GEMINI_API_KEY`: Your Gemini API key
     - `MONGO_URI`: Your MongoDB Atlas connection string

### Method 2: Manual Deployment

#### Deploy Backend First

1. **Create Web Service**:
   - Go to Render dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Backend Service**:
   - **Name**: `sameer-portfolio-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

3. **Add Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `GEMINI_API_KEY`: Your Gemini API key
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `FRONTEND_URL`: `https://sameer-portfolio-frontend.onrender.com`
   - `ABUSE_DETECTION_ENABLED`: `true`
   - `MAX_REQUESTS_PER_MINUTE`: `60`

4. **Deploy Backend**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the backend URL (e.g., `https://sameer-portfolio-backend.onrender.com`)

#### Deploy Frontend

1. **Create Static Site**:
   - Go to Render dashboard
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend Service**:
   - **Name**: `sameer-portfolio-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

3. **Add Environment Variables**:
   - `VITE_BACKEND_URL`: Your backend URL from step 4

4. **Deploy Frontend**:
   - Click "Create Static Site"
   - Wait for deployment to complete

## Step 5: Update Frontend Backend URL

After deploying the backend, update the frontend environment variable:

1. Go to your frontend service in Render
2. Go to "Environment" tab
3. Update `VITE_BACKEND_URL` with your actual backend URL
4. Redeploy the frontend

## Step 6: Test Your Deployment

1. **Test Backend Health**:
   - Visit: `https://your-backend-url.onrender.com/api/chat/health`
   - Should return a success message

2. **Test Chat API**:
   - Use Postman or curl to test the chat endpoint
   - URL: `https://your-backend-url.onrender.com/api/chat`
   - Method: POST
   - Body: `{"message": "Hello, how are you?"}`

3. **Test Frontend**:
   - Visit your frontend URL
   - Try the chat functionality
   - Check if it connects to the backend

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check the build logs in Render
   - Ensure all dependencies are in package.json
   - Verify TypeScript compilation

2. **Environment Variables**:
   - Double-check all environment variables are set correctly
   - Ensure no extra spaces or quotes

3. **CORS Issues**:
   - Verify FRONTEND_URL is set correctly in backend
   - Check that the frontend URL matches exactly

4. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check network access settings
   - Ensure database user has correct permissions

5. **API Key Issues**:
   - Verify Gemini API key is correct
   - Check if the API key has proper permissions

### Debugging Steps

1. **Check Logs**:
   - Go to your service in Render
   - Click on "Logs" tab
   - Look for error messages

2. **Test Locally**:
   - Test with production environment variables locally
   - Use the same MongoDB Atlas database

3. **Health Check**:
   - Visit `/api/chat/health` endpoint
   - Should return status and database connection info

## Security Considerations

1. **Environment Variables**: Never commit API keys to Git
2. **CORS**: Only allow your frontend domain
3. **Rate Limiting**: Already configured in the backend
4. **HTTPS**: Render provides SSL certificates automatically

## Monitoring

1. **Render Dashboard**: Monitor service health and logs
2. **MongoDB Atlas**: Monitor database performance
3. **Google AI Studio**: Monitor API usage and quotas

## Cost Optimization

1. **Free Tier Limits**:
   - Render: 750 hours/month for free tier
   - MongoDB Atlas: 512MB storage free
   - Google AI: Check current pricing

2. **Scaling**: Upgrade plans as needed when you hit limits

## Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **MongoDB Atlas Documentation**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Google AI Documentation**: [ai.google.dev](https://ai.google.dev)

Your portfolio with AI chat functionality should now be fully deployed and working on Render! 