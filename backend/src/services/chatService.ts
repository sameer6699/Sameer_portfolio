import { ollamaService } from './ollamaService';

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