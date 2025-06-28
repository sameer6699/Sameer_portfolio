import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './db';
import { checkOllamaOnStartup } from './utils/ollamaCheck';
import { checkNgrokStatus } from './utils/ngrokCheck';
import { startNgrokMonitoring, stopNgrokMonitoring } from './utils/ngrokMonitor';

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
      
      // Check ngrok status after server starts
      setTimeout(async () => {
        await checkNgrokStatus();
        
        // Start periodic monitoring
        startNgrokMonitoring(5); // Check every 5 minutes
      }, 1000);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down server...');
      stopNgrokMonitoring();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Shutting down server...');
      stopNgrokMonitoring();
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 