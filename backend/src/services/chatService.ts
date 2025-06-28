import { ollamaService } from './ollamaService';
import axios from 'axios';
import { Chat, IChat } from '../models/chatModel';

export const callOllama = async (
  messages: { role: string; content: string }[],
  context?: any
) => {
  try {
    // Check if Ollama is running
    const isHealthy = await ollamaService.healthCheck();
    if (!isHealthy) {
      throw new Error('Ollama is not running. Please start Ollama on localhost:11434');
    }

    // Get the model from environment or use default
    const model = process.env.OLLAMA_MODEL || 'llama2';
    
    // Generate response using Ollama with context
    const result = await ollamaService.generateChatCompletion(messages, model, undefined, context);
    return result;
  } catch (error: any) {
    console.error('[Ollama Service Error]', error.message || error);
    throw new Error(error.message || 'Failed to get response from Ollama.');
  }
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