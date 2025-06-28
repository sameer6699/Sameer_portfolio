#!/bin/bash

echo "🚀 Portfolio Backend Deployment Script"
echo "======================================"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
else
    echo "✅ Railway CLI found"
fi

# Navigate to backend directory
cd backend

echo "📦 Installing dependencies..."
npm install

echo "🔧 Building project..."
npm run build

echo "🚂 Deploying to Railway..."
railway up

echo "🌐 Getting deployment URL..."
railway domain

echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the deployment URL from above"
echo "2. Add it to your Vercel environment variables as VITE_BACKEND_URL"
echo "3. Redeploy your frontend"
echo ""
echo "🔗 Check the DEPLOYMENT_GUIDE.md for detailed instructions" 