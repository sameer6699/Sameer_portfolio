import { Request, Response } from 'express';
import { ollamaService } from '../services/ollamaService';

// In-memory session storage for streaming (in production, use Redis or database)
const streamingSessionStore = new Map<string, any>();

export const getOllamaModels = async (req: Request, res: Response) => {
  try {
    const models = await ollamaService.getModels();
    res.status(200).json({ models });
  } catch (error: any) {
    console.error('[Ollama Models Controller Error]', error.message || error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch models from Ollama.',
      details: 'Make sure Ollama is running on localhost:11434'
    });
  }
};

export const checkOllamaHealth = async (req: Request, res: Response) => {
  try {
    const isHealthy = await ollamaService.healthCheck();
    if (isHealthy) {
      res.status(200).json({ 
        status: 'healthy', 
        message: 'Ollama is running and accessible',
        baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
      });
    } else {
      res.status(503).json({ 
        status: 'unhealthy', 
        message: 'Ollama is not accessible',
        baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
      });
    }
  } catch (error: any) {
    console.error('[Ollama Health Controller Error]', error.message || error);
    res.status(503).json({ 
      status: 'error', 
      error: error.message || 'Failed to check Ollama health.',
      details: 'Make sure Ollama is running on localhost:11434'
    });
  }
};

export const handleStreamingChat = async (req: Request, res: Response) => {
  try {
    const { messages, model, options, sessionId, context } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format.' });
    }

    // Get or create session context for streaming
    let sessionContext = sessionId ? streamingSessionStore.get(sessionId) : null;
    if (!sessionContext) {
      sessionContext = {
        conversationHistory: [],
        systemMessage: context?.systemMessage,
        maxHistoryLength: context?.maxHistoryLength || 10
      };
      if (sessionId) {
        streamingSessionStore.set(sessionId, sessionContext);
      }
    }

    // Set headers for Server-Sent Events
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    });

    console.log(`[Streaming Chat] Starting stream with model: ${model || 'default'}, sessionId: ${sessionId || 'none'}`);
    
    let updatedContext: any = null;
    
    // Stream the response
    for await (const chunk of ollamaService.streamChatCompletion(messages, model, options, sessionContext)) {
      if (chunk.isComplete && chunk.updatedContext) {
        updatedContext = chunk.updatedContext;
        // Update session with new context
        if (sessionId) {
          streamingSessionStore.set(sessionId, updatedContext);
        }
        res.write(`data: ${JSON.stringify({ 
          content: chunk.content, 
          isComplete: true,
          sessionId: sessionId || null,
          context: updatedContext
        })}\n\n`);
      } else {
        res.write(`data: ${JSON.stringify({ 
          content: chunk.content, 
          isComplete: false 
        })}\n\n`);
      }
    }
    
    // Send end signal
    res.write('data: [DONE]\n\n');
    res.end();
    
  } catch (error: any) {
    console.error('[Streaming Chat Controller Error]', error.message || error);
    
    // If headers haven't been sent yet, send error response
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || 'Failed to stream response from Ollama.' });
    } else {
      // If streaming has started, send error as SSE
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }
  }
}; 