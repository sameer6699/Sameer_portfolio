import { GeminiService } from './geminiService';
import { FallbackService } from './fallbackService';
import { AbuseDetectionService } from './abuseDetectionService';
import { rateLimitService } from './rateLimitService';
import { cacheService } from './cacheService';
import { Chat, IChat } from '../models/chatModel';

// Initialize Gemini service
const geminiService = new GeminiService();

// Define the return type for chat responses
interface ChatResponse {
  response: string;
  updatedContext: any;
  isFallback?: boolean;
}

export const callGemini = async (
  messages: { role: string; content: string }[],
  context?: any,
  sessionId?: string
): Promise<ChatResponse> => {
  try {
    // Get the last user message for abuse detection
    const lastUserMessage = messages[messages.length - 1];
    const userMessage = lastUserMessage?.content || '';
    const language = context?.language || 'english';
    
    // Check for abusive language first
    const abuseCheck = AbuseDetectionService.handleAbusiveMessage(userMessage, language);
    if (abuseCheck.shouldRespond && abuseCheck.response) {
      console.log('[Chat Service] Abusive language detected, responding with abuse response');
      
      // Create response in the same format as normal response
      const updatedContext = {
        ...context,
        conversationHistory: [
          ...(context?.conversationHistory || []),
          { role: 'user', content: userMessage },
          { role: 'assistant', content: abuseCheck.response }
        ],
        abuseDetected: true // Flag to indicate this was an abuse response
      };
      
      return {
        response: abuseCheck.response,
        updatedContext,
        isFallback: false
      };
    }

    // Check cache first
    const cachedResponse = cacheService.getCachedResponse(messages, context);
    if (cachedResponse) {
      console.log('[Chat Service] Using cached response');
      const updatedContext = {
        ...context,
        conversationHistory: [
          ...(context?.conversationHistory || []),
          { role: 'user', content: userMessage },
          { role: 'assistant', content: cachedResponse }
        ],
        cachedResponse: true
      };
      
      return {
        response: cachedResponse,
        updatedContext,
        isFallback: false
      };
    }

    // Check rate limits if sessionId is provided
    if (sessionId) {
      const rateLimitCheck = rateLimitService.canMakeRequest(sessionId);
      if (!rateLimitCheck.allowed) {
        console.log(`[Chat Service] Rate limit exceeded for session ${sessionId}: ${rateLimitCheck.reason}`);
        return getFallbackResponse(messages, context, 'rate_limit_exceeded', rateLimitCheck.waitTime);
      }
    }

    // Check if Gemini is available
    const isHealthy = await geminiService.healthCheck();
    if (!isHealthy) {
      console.warn('[Chat Service] Gemini is not available, using fallback responses');
      return getFallbackResponse(messages, context);
    }

    // Get the model from environment or use default
    const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    
    // Generate response using Gemini with context
    const result = await geminiService.generateChatCompletion(messages, model, undefined, context);
    
    // Cache the successful response
    cacheService.cacheResponse(messages, result.response, context);
    
    return {
      response: result.response,
      updatedContext: result.updatedContext,
      isFallback: false
    };
  } catch (error: any) {
    console.error('[Gemini Service Error]', error.message || error);
    
    // Handle rate limit errors specifically
    if (error.message?.includes('429') || error.message?.includes('Too Many Requests')) {
      if (sessionId) {
        // Extract retry-after time if available
        const retryAfter = error.response?.headers?.['retry-after'] || 60;
        rateLimitService.handleRateLimitError(sessionId, parseInt(retryAfter));
      }
      console.warn('[Chat Service] Rate limit hit, using fallback response');
      return getFallbackResponse(messages, context, 'rate_limit_exceeded');
    }
    
    // Use fallback response for other errors
    console.warn('[Chat Service] Using fallback response due to Gemini error');
    return getFallbackResponse(messages, context, error.message);
  }
};

/**
 * Get fallback response when AI service is unavailable
 */
const getFallbackResponse = (
  messages: { role: string; content: string }[],
  context?: any,
  errorMessage?: string,
  waitTime?: number
): ChatResponse => {
  // Get the last user message
  const lastUserMessage = messages[messages.length - 1];
  const userMessage = lastUserMessage?.content || '';
  
  // Extract language from context if available
  const language = context?.language || 'english';
  
  // Get conversation history for context-aware responses
  const conversationHistory = context?.conversationHistory || [];
  
  // Determine error type for specific fallback responses
  let errorType = 'default';
  if (errorMessage) {
    if (errorMessage === 'rate_limit_exceeded') {
      errorType = 'rate_limit';
    } else if (errorMessage.includes('timeout') || errorMessage.includes('time out')) {
      errorType = 'timeout';
    } else if (errorMessage.includes('connection') || errorMessage.includes('ECONNREFUSED')) {
      errorType = 'connection';
    } else if (errorMessage.includes('service') || errorMessage.includes('unavailable')) {
      errorType = 'service_unavailable';
    }
  }
  
  // Get smart fallback response
  const fallbackResponse = FallbackService.getSmartFallbackResponse(
    userMessage, 
    conversationHistory, 
    language
  );
  
  // Create response in the same format as Ollama response
  const updatedContext = {
    ...context,
    conversationHistory: [
      ...conversationHistory,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: fallbackResponse }
    ],
    fallbackMode: true // Flag to indicate this is a fallback response
  };
  
  return {
    response: fallbackResponse,
    updatedContext,
    isFallback: true
  };
};

// Keep the old function for backward compatibility but mark it as deprecated
export const callOpenAI = async (messages: { role: string; content: string }[]) => {
  console.warn('[DEPRECATED] callOpenAI is deprecated. Use callGemini instead.');
  const result = await callGemini(messages);
  return result.response; // Return just the response for backward compatibility
};

export const saveChatToDatabase = async (
  sessionId: string,
  userMessage: string,
  aiResponse: string,
  context?: any
): Promise<IChat> => {
  try {
    const chatEntry = new Chat({
      sessionId,
      userMessage,
      aiResponse,
      context
    });
    
    const savedChat = await chatEntry.save();
    console.log('Chat saved to database:', savedChat._id);
    return savedChat;
  } catch (error) {
    console.error('Error saving chat to database:', error);
    throw error;
  }
};

export const getChatHistory = async (sessionId: string): Promise<IChat[]> => {
  try {
    const chats = await Chat.find({ sessionId })
      .sort({ timestamp: -1 })
      .limit(50); // Limit to last 50 messages
    return chats;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};

export const clearChatHistory = async (sessionId: string): Promise<void> => {
  try {
    await Chat.deleteMany({ sessionId });
    console.log('Chat history cleared for session:', sessionId);
  } catch (error) {
    console.error('Error clearing chat history:', error);
    throw error;
  }
}; 