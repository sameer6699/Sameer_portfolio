import { Request, Response } from 'express';
import { callGemini, saveChatToDatabase, getChatHistory, clearChatHistory } from '../services/chatService';
import { rateLimitService } from '../services/rateLimitService';

// In-memory session storage (in production, use Redis or database)
const sessionStore = new Map<string, any>();

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { messages, sessionId, context } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format.' });
    }
    
    // Log the incoming user message(s) as JSON
    console.log(JSON.stringify({ event: 'incoming_user_message', messages, sessionId }));
    
    // Get or create session context
    let sessionContext = sessionId ? sessionStore.get(sessionId) : null;
    if (!sessionContext) {
      sessionContext = {
        conversationHistory: [],
        systemMessage: context?.systemMessage,
        maxHistoryLength: context?.maxHistoryLength || 10,
        language: context?.language || 'english'
      };
      if (sessionId) {
        sessionStore.set(sessionId, sessionContext);
      }
    }
    
    // Call Gemini with context (now includes fallback handling)
    const result = await callGemini(messages, sessionContext, sessionId);
    
    // Update session with new context
    if (sessionId) {
      sessionStore.set(sessionId, result.updatedContext);
    }
    
    // Save chat to MongoDB (only if not in fallback mode to avoid spam)
    if (sessionId && messages.length > 0 && !result.isFallback) {
      const lastUserMessage = messages[messages.length - 1];
      if (lastUserMessage.role === 'user') {
        try {
          await saveChatToDatabase(
            sessionId,
            lastUserMessage.content,
            result.response,
            result.updatedContext
          );
        } catch (dbError) {
          console.error('Failed to save chat to database:', dbError);
          // Don't fail the request if database save fails
        }
      }
    }
    
    // Add fallback indicator to response if using fallback mode
    const responseData: any = {
      response: result.response,
      sessionId: sessionId || null,
      context: result.updatedContext
    };
    
    if (result.isFallback) {
      responseData.isFallback = true;
      responseData.fallbackMessage = "Using intelligent fallback responses while AI service is unavailable.";
    }
    
    res.status(200).json(responseData);
    
  } catch (error: any) {
    console.error('[Chat Controller Error]', error.message || error);
    
    // Even if there's an error in the controller, try to provide a fallback response
    try {
      const { messages, sessionId, context } = req.body;
      const lastUserMessage = messages?.[messages.length - 1];
      const userMessage = lastUserMessage?.content || 'Hello';
      const language = context?.language || 'english';
      
      // Import FallbackService here to avoid circular dependencies
      const { FallbackService } = await import('../services/fallbackService');
      const fallbackResponse = FallbackService.getErrorFallbackResponse('default', language);
      
      res.status(200).json({
        response: fallbackResponse,
        sessionId: sessionId || null,
        isFallback: true,
        fallbackMessage: "Emergency fallback response due to system error.",
        error: "System temporarily unavailable, using fallback mode."
      });
    } catch (fallbackError) {
      // If even fallback fails, return a basic error response
      res.status(500).json({ 
        error: 'Service temporarily unavailable. Please try again later.',
        fallbackResponse: "I'm Sam AI, Sameer's portfolio assistant. I'm currently experiencing technical difficulties, but I can tell you that Sameer is a skilled software developer with expertise in React, Node.js, and cloud technologies. Feel free to explore his portfolio for more information!"
      });
    }
  }
};

// New endpoint to clear session context
export const clearSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    if (sessionId && sessionStore.has(sessionId)) {
      sessionStore.delete(sessionId);
      res.status(200).json({ message: 'Session cleared successfully' });
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  } catch (error: any) {
    console.error('[Clear Session Error]', error.message || error);
    res.status(500).json({ error: 'Failed to clear session' });
  }
};

// New endpoint to get session context
export const getSessionContext = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    if (sessionId && sessionStore.has(sessionId)) {
      const context = sessionStore.get(sessionId);
      res.status(200).json({ context });
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  } catch (error: any) {
    console.error('[Get Session Context Error]', error.message || error);
    res.status(500).json({ error: 'Failed to get session context' });
  }
};

// New endpoint to get chat history from database
export const getChatHistoryController = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    const chatHistory = await getChatHistory(sessionId);
    res.status(200).json({ chatHistory });
  } catch (error: any) {
    console.error('[Get Chat History Error]', error.message || error);
    res.status(500).json({ error: 'Failed to get chat history' });
  }
};

// New endpoint to clear chat history from database
export const clearChatHistoryController = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    await clearChatHistory(sessionId);
    res.status(200).json({ message: 'Chat history cleared successfully' });
  } catch (error: any) {
    console.error('[Clear Chat History Error]', error.message || error);
    res.status(500).json({ error: 'Failed to clear chat history' });
  }
};

// New endpoint to get rate limit status
export const getRateLimitStatus = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    const status = rateLimitService.getRateLimitStatus(sessionId);
    res.status(200).json(status);
  } catch (error: any) {
    console.error('[Get Rate Limit Status Error]', error.message || error);
    res.status(500).json({ error: 'Failed to get rate limit status' });
  }
}; 