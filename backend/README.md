# Portfolio Backend with Ollama Integration

This backend provides chat functionality using Ollama running locally on `localhost:11434` with advanced context management and session handling.

## Prerequisites

1. **Install Ollama**: Download and install Ollama from [https://ollama.ai](https://ollama.ai)
2. **Pull a Model**: After installing Ollama, pull a model (e.g., `llama2`):
   ```bash
   ollama pull llama2
   ```

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the backend directory with the following variables:
   ```env
   # Server Configuration
   PORT=5000

   # Ollama Configuration
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=llama2

   # Database Configuration (if using MongoDB)
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

3. **Start Ollama**:
   ```bash
   ollama serve
   ```

4. **Run the Backend**:
   ```bash
   npm run dev
   ```

## API Endpoints

### Chat Endpoints

- **POST** `/api/chat` - Send a chat message and get a response
  ```json
  {
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ],
    "sessionId": "optional-session-id",
    "context": {
      "systemMessage": "Custom system message",
      "maxHistoryLength": 10
    }
  }
  ```

- **POST** `/api/chat/stream` - Stream chat responses in real-time
  ```json
  {
    "messages": [
      {"role": "user", "content": "Tell me a story"}
    ],
    "model": "llama2",
    "options": {
      "temperature": 0.7
    },
    "sessionId": "optional-session-id",
    "context": {
      "systemMessage": "Custom system message",
      "maxHistoryLength": 10
    }
  }
  ```

### Session Management Endpoints

- **GET** `/api/chat/session/:sessionId` - Get session context
- **DELETE** `/api/chat/session/:sessionId` - Clear session context

### Ollama Management Endpoints

- **GET** `/api/chat/models` - Get available Ollama models
- **GET** `/api/chat/health` - Check if Ollama is running and accessible

### Context Management Endpoints

- **GET** `/api/contexts` - Get all available AI contexts/personas
- **GET** `/api/contexts/default` - Get default context information
- **GET** `/api/contexts/:contextId` - Get specific context by ID

## Available AI Contexts

The backend includes several pre-configured AI personas:

### 1. Portfolio Assistant (Default)
- **ID**: `portfolio`
- **Purpose**: Sameer's portfolio website assistant
- **Features**: Knowledge about Sameer's skills, projects, and experience
- **Best for**: Portfolio visitors asking about Sameer's work

### 2. Technical Expert
- **ID**: `technical`
- **Purpose**: Technical discussions and coding help
- **Features**: Deep knowledge of programming, frameworks, and best practices
- **Best for**: Technical questions and coding assistance

### 3. Casual Chat
- **ID**: `casual`
- **Purpose**: Friendly and casual conversations
- **Features**: Warm, engaging personality for general chat
- **Best for**: Light conversations and social interaction

### 4. Creative Assistant
- **ID**: `creative`
- **Purpose**: Creative projects and brainstorming
- **Features**: Imaginative thinking and creative problem-solving
- **Best for**: Brainstorming, creative writing, and innovative ideas

## Session Management

The backend supports conversation sessions to maintain context across multiple messages:

### Using Sessions

1. **Start a Session**:
   ```json
   {
     "messages": [{"role": "user", "content": "Hello!"}],
     "sessionId": "my-session-123"
   }
   ```

2. **Continue Conversation**:
   ```json
   {
     "messages": [{"role": "user", "content": "What did we talk about?"}],
     "sessionId": "my-session-123"
   }
   ```

3. **Clear Session**:
   ```bash
   DELETE /api/chat/session/my-session-123
   ```

### Context Features

- **System Messages**: Custom instructions for the AI
- **Conversation History**: Maintains context across messages
- **Configurable History Length**: Control how much context to keep
- **Multiple Personas**: Switch between different AI personalities

## Available Models

You can use any model that you have pulled with Ollama. Some popular models:

- `llama2` - Meta's Llama 2 model
- `llama2:7b` - Smaller Llama 2 model
- `llama2:13b` - Larger Llama 2 model
- `codellama` - Code-focused Llama model
- `mistral` - Mistral AI's model

To pull a model:
```bash
ollama pull <model-name>
```

## Error Handling

The backend includes comprehensive error handling for:
- Ollama not running
- Model not found
- Network connectivity issues
- Invalid request formats
- Session management errors

## Development

- **Build**: `npm run build`
- **Start Production**: `npm start`
- **Development**: `npm run dev`
- **Test Integration**: `npm run test:ollama`

## Troubleshooting

1. **Ollama not running**: Make sure Ollama is started with `ollama serve`
2. **Model not found**: Pull the model first with `ollama pull <model-name>`
3. **Connection refused**: Check that Ollama is running on `localhost:11434`
4. **Port already in use**: Change the PORT in your `.env` file
5. **Session issues**: Clear sessions or restart the server

## Features

- ✅ Local AI chat using Ollama
- ✅ Real-time streaming responses
- ✅ Conversation context and history
- ✅ Session management
- ✅ Multiple AI personas/contexts
- ✅ Model management
- ✅ Health checks
- ✅ Error handling
- ✅ TypeScript support
- ✅ CORS enabled
- ✅ Environment configuration

## Example Usage

### Basic Chat
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}]}'
```

### Chat with Session
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Tell me about Sameer"}],
    "sessionId": "user-123"
  }'
```

### Get Available Contexts
```bash
curl http://localhost:5000/api/contexts
```

### Test Integration
```bash
npm run test:ollama 