import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './db';
import { checkOllamaOnStartup } from './utils/ollamaCheck';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Check Ollama connection on startup
    await checkOllamaOnStartup();
    
    // Connect to database
    await connectDB();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`🔗 Chat endpoint: http://localhost:${PORT}/api/chat`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/chat/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 