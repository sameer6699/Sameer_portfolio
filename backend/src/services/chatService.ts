import { ollamaService } from './ollamaService';
import { FallbackService } from './fallbackService';
import axios from 'axios';
import { Chat, IChat } from '../models/chatModel';

// Define the return type for chat responses
interface ChatResponse {
  response: string;
  updatedContext: any;
  isFallback?: boolean;
}

export const callOllama = async (
  messages: { role: string; content: string }[],
  context?: any
): Promise<ChatResponse> => {
  try {
    // Check if Ollama is running
    const isHealthy = await ollamaService.healthCheck();
    if (!isHealthy) {
      console.warn('[Chat Service] Ollama is not running, using fallback responses');
      return getFallbackResponse(messages, context);
    }

    // Get the model from environment or use default
    const model = process.env.OLLAMA_MODEL || 'llama2';
    
    // Generate response using Ollama with context
    const result = await ollamaService.generateChatCompletion(messages, model, undefined, context);
    return {
      response: result.response,
      updatedContext: result.updatedContext,
      isFallback: false
    };
  } catch (error: any) {
    console.error('[Ollama Service Error]', error.message || error);
    
    // Use fallback response instead of throwing error
    console.warn('[Chat Service] Using fallback response due to Ollama error');
    return getFallbackResponse(messages, context, error.message);
  }
};

/**
 * Get fallback response when AI service is unavailable
 */
const getFallbackResponse = (
  messages: { role: string; content: string }[],
  context?: any,
  errorMessage?: string
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
    if (errorMessage.includes('timeout') || errorMessage.includes('time out')) {
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
  console.warn('[DEPRECATED] callOpenAI is deprecated. Use callOllama instead.');
  const result = await callOllama(messages);
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