#!/bin/bash

echo "🚀 Starting One-Shot Deployment to Render"
echo "=========================================="

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found!"
    echo "Please make sure you're in the project root directory."
    exit 1
fi

echo "✅ render.yaml found"

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Error: backend directory not found!"
    exit 1
fi

echo "✅ Backend directory found"

# Check if package.json exists in root (frontend)
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in root directory!"
    exit 1
fi

echo "✅ Frontend package.json found"

echo ""
echo "📋 Deployment Checklist:"
echo "========================"
echo "1. ✅ render.yaml configured"
echo "2. ✅ Backend and frontend code ready"
echo "3. ⏳ Ready to deploy to Render"
echo ""
echo "🔧 Next Steps:"
echo "=============="
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for Render deployment'"
echo "   git push origin main"
echo ""
echo "2. Go to https://render.com and:"
echo "   - Create a new account or sign in"
echo "   - Click 'New +' → 'Blueprint'"
echo "   - Connect your GitHub repository"
echo "   - Render will automatically detect render.yaml"
echo "   - Click 'Apply' to deploy both services"
echo ""
echo "3. Configure Environment Variables in Render Dashboard:"
echo "   For Backend Service:"
echo "   - GEMINI_API_KEY: Your Google Gemini API key"
echo "   - MONGO_URI: Your MongoDB Atlas connection string"
echo ""
echo "4. Wait for deployment to complete (5-10 minutes)"
echo ""
echo "🎯 Your services will be available at:"
echo "   Frontend: https://sameer-portfolio-frontend.onrender.com"
echo "   Backend:  https://sameer-portfolio-backend.onrender.com"
echo ""
echo "🔍 Monitor deployment:"
echo "   - Check Render dashboard for build logs"
echo "   - Test health endpoint: https://sameer-portfolio-backend.onrender.com/api/chat/health"
echo ""

echo "🚀 Ready to deploy! Follow the steps above." 