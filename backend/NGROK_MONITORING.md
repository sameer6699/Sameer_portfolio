# ngrok Monitoring & Status Checking

This document explains the ngrok monitoring features added to your backend server.

## 🚀 Features Added

### 1. **Automatic ngrok Status Check on Startup**
When you run `npm run dev`, the server will:
- Start normally
- Check ngrok tunnel status after 1 second
- Display detailed tunnel information
- Start periodic monitoring

### 2. **Periodic Monitoring**
- Checks ngrok health every 5 minutes
- Logs warnings if ngrok becomes unavailable
- Runs in the background automatically

### 3. **API Endpoints for Status**
- `GET /api/ngrok/status` - Basic ngrok status
- `GET /api/ngrok/status/detailed` - Detailed tunnel information

## 📊 What You'll See When Starting the Server

### Without ngrok Running:
```
🚀 Server running on port 5000
📡 API endpoints available at http://localhost:5000/api
🔗 Chat endpoint: http://localhost:5000/api/chat
🔗 Health check: http://localhost:5000/api/chat/health

🌐 ngrok Status:
❌ ngrok is not running or not accessible
   To start ngrok, run: ngrok http 5000
   Or use the live script: npm run live (from project root)

🔍 Starting ngrok monitoring (checking every 5 minutes)
```

### With ngrok Running:
```
🚀 Server running on port 5000
📡 API endpoints available at http://localhost:5000/api
🔗 Chat endpoint: http://localhost:5000/api/chat
🔗 Health check: http://localhost:5000/api/chat/health

🌐 ngrok Tunnels Status:
✅ ngrok is running and tunnels are active!
   1. unnamed
      Public URL: https://abc123.ngrok.io
      Protocol: https
      Local Address: localhost:5000

🎯 Backend API is accessible via ngrok!
   API URL: https://abc123.ngrok.io/api
   Chat endpoint: https://abc123.ngrok.io/api/chat
   Health check: https://abc123.ngrok.io/api/chat/health

🔍 Starting ngrok monitoring (checking every 5 minutes)
```

## 🔧 API Endpoints

### Basic Status
```bash
GET http://localhost:5000/api/ngrok/status
```

Response:
```json
{
  "status": "running",
  "monitoring": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Detailed Status
```bash
GET http://localhost:5000/api/ngrok/status/detailed
```

Response:
```json
{
  "output": "🌐 ngrok Tunnels Status:\n✅ ngrok is running and tunnels are active!\n   1. unnamed\n      Public URL: https://abc123.ngrok.io\n      Protocol: https\n      Local Address: localhost:5000\n\n🎯 Backend API is accessible via ngrok!\n   API URL: https://abc123.ngrok.io/api\n   Chat endpoint: https://abc123.ngrok.io/api/chat\n   Health check: https://abc123.ngrok.io/api/chat/health\n",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🧪 Testing

### Test ngrok Monitoring
```bash
npm run test:ngrok
```

This will test all ngrok monitoring endpoints and show you the results.

### Manual Testing
1. Start the backend: `npm run dev`
2. Check basic status: `curl http://localhost:5000/api/ngrok/status`
3. Check detailed status: `curl http://localhost:5000/api/ngrok/status/detailed`

## 🔍 Monitoring Behavior

### Periodic Checks
- Runs every 5 minutes automatically
- Logs warnings if ngrok becomes unavailable
- Continues monitoring until server shutdown

### Graceful Shutdown
- Stops monitoring when server shuts down
- Handles SIGINT and SIGTERM signals properly

## 🛠️ Configuration

### Environment Variables
- `PORT` - Backend port (default: 5000)
- `NGROK_AUTH_TOKEN` - ngrok authentication token (optional)

### Monitoring Interval
To change the monitoring interval, edit `src/server.ts`:
```typescript
startNgrokMonitoring(10); // Check every 10 minutes instead of 5
```

## 📱 Integration with Live Chat

When using `npm run live` from the project root:
1. The live script starts both frontend and backend
2. Backend automatically detects ngrok tunnels
3. Shows public URLs for sharing
4. Monitors tunnel health continuously

## 🚨 Troubleshooting

### ngrok Not Detected
- Make sure ngrok is running: `ngrok http 5000`
- Check ngrok web interface: http://localhost:4040
- Verify ngrok auth token if using one

### Monitoring Not Working
- Check if axios is installed: `npm install axios`
- Verify the ngrok API is accessible: http://localhost:4040/api/tunnels
- Check server logs for errors

### API Endpoints Not Responding
- Ensure backend is running: `npm run dev`
- Check if routes are properly registered
- Verify CORS settings if calling from frontend

## 🎯 Use Cases

### Development
- Monitor ngrok tunnel status during development
- Get quick status via API endpoints
- Automatic warnings if tunnel goes down

### Production Monitoring
- Check ngrok health remotely via API
- Integrate with monitoring tools
- Get detailed tunnel information

### Live Demos
- Verify tunnel is working before sharing
- Get public URLs for easy sharing
- Monitor tunnel health during presentations 