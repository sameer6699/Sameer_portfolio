import { Request, Response } from 'express';
import { callOllama } from '../services/chatService';

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
        maxHistoryLength: context?.maxHistoryLength || 10
      };
      if (sessionId) {
        sessionStore.set(sessionId, sessionContext);
      }
    }
    
    // Call Ollama with context
    const result = await callOllama(messages, sessionContext);
    
    // Update session with new context
    if (sessionId) {
      sessionStore.set(sessionId, result.updatedContext);
    }
    
    res.status(200).json({ 
      response: result.response,
      sessionId: sessionId || null,
      context: result.updatedContext
    });
  } catch (error: any) {
    // Ollama-specific error logging
    console.error('[Ollama Controller Error]', error.message || error);
    res.status(500).json({ error: error.message || 'Failed to get response from Ollama.' });
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