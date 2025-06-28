# MongoDB Integration Setup

This document explains how the MongoDB integration works for storing chat conversations in your portfolio backend.

## Database Configuration

- **Database URL**: `mongodb://localhost:27017`
- **Database Name**: `Sameer_Portfolio`
- **Collection Name**: `Sam_AI`

## Features

### 1. Chat Storage
- All user messages and AI responses are automatically stored in MongoDB
- Each chat entry includes:
  - `sessionId`: Unique identifier for the chat session
  - `userMessage`: The user's input message
  - `aiResponse`: The AI's generated response
  - `timestamp`: When the conversation occurred
  - `context`: Optional conversation context

### 2. Chat History Management
- Retrieve chat history for any session
- Clear chat history for specific sessions
- Automatic indexing for efficient queries

## API Endpoints

### Existing Endpoints
- `POST /api/chat` - Send a message and get AI response (now saves to MongoDB)
- `POST /api/chat/stream` - Streaming chat endpoint
- `GET /api/chat/models` - Get available Ollama models
- `GET /api/chat/health` - Health check

### New Endpoints
- `GET /api/chat/history/:sessionId` - Get chat history for a session
- `DELETE /api/chat/history/:sessionId` - Clear chat history for a session

## Testing

### Test MongoDB Connection
```bash
npm run test:mongodb
```

### Test Chat Storage
1. Start the server: `npm run dev`
2. Send a POST request to `/api/chat` with:
```json
{
  "messages": [{"role": "user", "content": "Hello"}],
  "sessionId": "test-session-123"
}
```
3. Check MongoDB to see the stored conversation

## Database Schema

```javascript
{
  sessionId: String,        // Required, indexed
  userMessage: String,      // Required
  aiResponse: String,       // Required
  timestamp: Date,          // Auto-generated
  context: Mixed            // Optional conversation context
}
```

## Error Handling

- Database errors are logged but don't fail the chat request
- Graceful fallback if MongoDB is unavailable
- Automatic reconnection handling

## Performance Considerations

- Compound index on `sessionId` and `timestamp` for efficient queries
- Limited to last 50 messages per session in history retrieval
- Automatic cleanup of old sessions (in-memory only)

## Environment Variables

The MongoDB connection uses the `MONGO_URI` environment variable:
- Default: `mongodb://localhost:27017/Sameer_Portfolio`
- Can be overridden in `.env` file

## Monitoring

Check the server logs for:
- `MongoDB connected` - Successful database connection
- `Chat saved to database: [id]` - Successful chat storage
- Database error messages for troubleshooting 