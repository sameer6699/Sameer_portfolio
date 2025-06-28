# Live Chat with Sam AI - Setup Guide

This guide will help you set up the live chat functionality for your portfolio using ngrok to make it accessible from anywhere on the internet.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js and npm installed
- MongoDB running locally (`mongodb://localhost:27017`)
- Ollama running locally (for AI responses)
- ngrok account (free at https://ngrok.com/)

### 2. Install Dependencies
```bash
# Install ngrok (already done)
npm install ngrok --save-dev

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Set Up Environment Variables
Copy `env-example.txt` to `.env` and configure:
```bash
# Get your free ngrok token from https://ngrok.com/
NGROK_AUTH_TOKEN=your_ngrok_auth_token_here
BACKEND_PORT=5000
FRONTEND_PORT=5173
MONGO_URI=mongodb://localhost:27017/Sameer_Portfolio
```

### 4. Start Live Chat Server
```bash
npm run live
```

This will:
- Start your backend server
- Start your frontend server
- Create ngrok tunnels for both
- Generate public URLs you can share

## 📱 What You Get

After running `npm run live`, you'll see output like:
```
🎉 Live Chat Server is running!
📱 Share these URLs:
   Frontend: https://abc123.ngrok.io
   Backend API: https://xyz789.ngrok.io/api/chat
```

## 🔧 How It Works

### Frontend Integration
The chat interface is already built into your portfolio's Footer component. It includes:
- Language selection (English, Hindi, etc.)
- Real-time chat with Sam AI
- Message history
- Responsive design

### Backend Features
- MongoDB storage for all conversations
- Session management
- AI response generation via Ollama
- RESTful API endpoints

### ngrok Tunneling
- Creates secure tunnels to your local servers
- Provides public HTTPS URLs
- Handles CORS and routing automatically

## 🎯 API Endpoints

### Chat Endpoints
- `POST /api/chat` - Send message and get AI response
- `GET /api/chat/history/:sessionId` - Get chat history
- `DELETE /api/chat/history/:sessionId` - Clear chat history
- `GET /api/chat/health` - Health check

### Context Endpoints
- `GET /api/contexts` - Get available AI contexts
- `POST /api/contexts/:contextId` - Set AI context

## 🗄️ Database Schema

Chats are stored in MongoDB with this structure:
```javascript
{
  sessionId: String,        // Unique session identifier
  userMessage: String,      // User's input message
  aiResponse: String,       // AI's generated response
  timestamp: Date,          // When conversation occurred
  context: Mixed            // Optional conversation context
}
```

## 🔒 Security & Privacy

### ngrok Security
- Uses HTTPS by default
- Optional authentication token
- Temporary URLs (change on restart)

### Data Privacy
- Chat data stored locally in MongoDB
- No data sent to external services (except Ollama)
- Session-based conversation tracking

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   ```bash
   # Start MongoDB
   mongod
   ```

2. **Ollama Not Running**
   ```bash
   # Start Ollama
   ollama serve
   ```

3. **ngrok Authentication Error**
   - Get free token from https://ngrok.com/
   - Add to `.env` file

4. **Port Already in Use**
   - Change ports in `.env` file
   - Kill existing processes

### Debug Mode
```bash
# Run with verbose logging
DEBUG=* npm run live
```

## 📊 Monitoring

### Server Logs
- Backend logs show API requests and database operations
- Frontend logs show build status and errors
- ngrok logs show tunnel status

### Database Monitoring
```bash
# Check MongoDB collections
mongo Sameer_Portfolio
> db.Sam_AI.find().sort({timestamp: -1}).limit(10)
```

## 🎨 Customization

### AI Personality
Edit `backend/src/config/aiContexts.ts` to customize Sam AI's personality and responses.

### Chat Interface
Modify `src/components/Footer.tsx` to change the chat UI design and functionality.

### Database Schema
Update `backend/src/models/chatModel.ts` to add new fields or modify existing ones.

## 🚀 Deployment

### Production Setup
For production deployment:
1. Use a proper domain instead of ngrok
2. Set up SSL certificates
3. Use a production MongoDB instance
4. Configure environment variables properly

### Alternative to ngrok
- Vercel for frontend hosting
- Railway/Render for backend hosting
- MongoDB Atlas for database

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify all services are running
3. Check server logs for errors
4. Ensure environment variables are set correctly

## 🎉 Success!

Once everything is running, your portfolio will have a fully functional live chat with Sam AI that:
- Works from anywhere on the internet
- Stores all conversations in MongoDB
- Provides intelligent responses via Ollama
- Supports multiple languages
- Has a beautiful, responsive interface 