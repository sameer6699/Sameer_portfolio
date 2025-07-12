#!/bin/bash

# Render Deployment Script for Sameer Portfolio
# This script helps prepare and deploy the project to Render

echo "🚀 Starting Render Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository. Please initialize git and add your files."
    exit 1
fi

print_status "Checking current git status..."

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_warning "You have uncommitted changes. Please commit them before deploying."
    echo "Run these commands:"
    echo "  git add ."
    echo "  git commit -m 'Prepare for Render deployment'"
    echo "  git push origin main"
    exit 1
fi

print_status "Checking if remote repository is set up..."

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    print_error "No remote origin found. Please add your GitHub repository as origin."
    echo "Run: git remote add origin <your-github-repo-url>"
    exit 1
fi

print_status "Checking if render.yaml exists..."

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    print_error "render.yaml not found. Please ensure it exists in the root directory."
    exit 1
fi

print_status "Checking backend dependencies..."

# Check if backend package.json exists
if [ ! -f "backend/package.json" ]; then
    print_error "backend/package.json not found."
    exit 1
fi

print_status "Checking frontend dependencies..."

# Check if frontend package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found in root directory."
    exit 1
fi

print_success "All pre-deployment checks passed!"

echo ""
print_status "Next steps for Render deployment:"
echo ""
echo "1. 📝 Set up MongoDB Atlas:"
echo "   - Go to https://mongodb.com/atlas"
echo "   - Create a free cluster"
echo "   - Set up database user and network access"
echo "   - Get your connection string"
echo ""
echo "2. 🤖 Set up Google AI Studio (Gemini):"
echo "   - Go to https://aistudio.google.com"
echo "   - Create an API key"
echo ""
echo "3. 🌐 Deploy on Render:"
echo "   - Go to https://render.com"
echo "   - Sign up/Login"
echo "   - Click 'New +' → 'Blueprint'"
echo "   - Connect your GitHub repository"
echo "   - Render will auto-detect render.yaml"
echo ""
echo "4. ⚙️ Configure Environment Variables in Render:"
echo "   Backend Service:"
echo "   - GEMINI_API_KEY: Your Gemini API key"
echo "   - MONGO_URI: Your MongoDB Atlas connection string"
echo ""
echo "5. 🔗 Update Frontend Backend URL:"
echo "   - After backend deploys, update VITE_BACKEND_URL in frontend service"
echo "   - Set it to your backend URL (e.g., https://sameer-portfolio-backend.onrender.com)"
echo ""
echo "6. 🧪 Test Your Deployment:"
echo "   - Test backend health: https://your-backend-url.onrender.com/api/chat/health/full"
echo "   - Test frontend: https://your-frontend-url.onrender.com"
echo "   - Test chat functionality"
echo ""

print_status "Current git status:"
git status --porcelain

print_status "Current branch:"
git branch --show-current

print_status "Remote origin:"
git remote get-url origin

echo ""
print_success "Deployment script completed successfully!"
print_status "Follow the steps above to complete your Render deployment."
echo ""
print_warning "Remember to never commit API keys or sensitive data to git!" 