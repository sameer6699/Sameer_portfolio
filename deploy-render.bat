@echo off
REM Render Deployment Script for Sameer Portfolio (Windows)
REM This script helps prepare and deploy the project to Render

echo 🚀 Starting Render Deployment Process...

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed. Please install Git first.
    exit /b 1
)

REM Check if we're in a git repository
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Not in a git repository. Please initialize git and add your files.
    exit /b 1
)

echo [INFO] Checking current git status...

REM Check for uncommitted changes
git diff-index --quiet HEAD --
if errorlevel 1 (
    echo [WARNING] You have uncommitted changes. Please commit them before deploying.
    echo Run these commands:
    echo   git add .
    echo   git commit -m "Prepare for Render deployment"
    echo   git push origin main
    exit /b 1
)

echo [INFO] Checking if remote repository is set up...

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [ERROR] No remote origin found. Please add your GitHub repository as origin.
    echo Run: git remote add origin ^<your-github-repo-url^>
    exit /b 1
)

echo [INFO] Checking if render.yaml exists...

REM Check if render.yaml exists
if not exist "render.yaml" (
    echo [ERROR] render.yaml not found. Please ensure it exists in the root directory.
    exit /b 1
)

echo [INFO] Checking backend dependencies...

REM Check if backend package.json exists
if not exist "backend\package.json" (
    echo [ERROR] backend\package.json not found.
    exit /b 1
)

echo [INFO] Checking frontend dependencies...

REM Check if frontend package.json exists
if not exist "package.json" (
    echo [ERROR] package.json not found in root directory.
    exit /b 1
)

echo [SUCCESS] All pre-deployment checks passed!

echo.
echo [INFO] Next steps for Render deployment:
echo.
echo 1. 📝 Set up MongoDB Atlas:
echo    - Go to https://mongodb.com/atlas
echo    - Create a free cluster
echo    - Set up database user and network access
echo    - Get your connection string
echo.
echo 2. 🤖 Set up Google AI Studio (Gemini):
echo    - Go to https://aistudio.google.com
echo    - Create an API key
echo.
echo 3. 🌐 Deploy on Render:
echo    - Go to https://render.com
echo    - Sign up/Login
echo    - Click "New +" → "Blueprint"
echo    - Connect your GitHub repository
echo    - Render will auto-detect render.yaml
echo.
echo 4. ⚙️ Configure Environment Variables in Render:
echo    Backend Service:
echo    - GEMINI_API_KEY: Your Gemini API key
echo    - MONGO_URI: Your MongoDB Atlas connection string
echo.
echo 5. 🔗 Update Frontend Backend URL:
echo    - After backend deploys, update VITE_BACKEND_URL in frontend service
echo    - Set it to your backend URL (e.g., https://sameer-portfolio-backend.onrender.com)
echo.
echo 6. 🧪 Test Your Deployment:
echo    - Test backend health: https://your-backend-url.onrender.com/api/chat/health/full
echo    - Test frontend: https://your-frontend-url.onrender.com
echo    - Test chat functionality
echo.

echo [INFO] Current git status:
git status --porcelain

echo [INFO] Current branch:
git branch --show-current

echo [INFO] Remote origin:
git remote get-url origin

echo.
echo [SUCCESS] Deployment script completed successfully!
echo [INFO] Follow the steps above to complete your Render deployment.
echo.
echo [WARNING] Remember to never commit API keys or sensitive data to git!

pause 