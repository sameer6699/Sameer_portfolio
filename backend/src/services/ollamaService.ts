import axios from 'axios';

interface OllamaMessage {
  role: string;
  content: string;
}

interface OllamaRequest {
  model: string;
  messages: OllamaMessage[];
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
    num_predict?: number;
  };
}

interface OllamaResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

interface ConversationContext {
  systemMessage: string;
  conversationHistory: OllamaMessage[];
  maxHistoryLength: number;
}

export class OllamaService {
  private baseURL: string;
  private defaultModel: string;
  private defaultContext: ConversationContext;

  constructor() {
    this.baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    this.defaultModel = process.env.OLLAMA_MODEL || 'llama2';
    
    // Default system message for portfolio assistant
    this.defaultContext = {
      systemMessage: `You are Sameer's AI assistant for his portfolio website. You are helpful, friendly, and knowledgeable about Sameer's background, skills, and projects.

Key Information about Sameer:
- Full Stack Developer with expertise in React, Node.js, TypeScript, and modern web technologies
- Experienced with cloud platforms like AWS, Google Cloud, and Firebase
- Skilled in UI/UX design using Figma and Adobe XD
- Active open source contributor and participant in programs like GSOC 2024
- Passionate about creating innovative web applications and solving complex problems

Your role:
- Help visitors learn about Sameer's skills and experience
- Answer questions about his projects and achievements
- Provide information about his technical expertise
- Be conversational and engaging while maintaining professionalism
- If asked about something not related to Sameer or his work, politely redirect to relevant topics

Always be helpful, accurate, and represent Sameer's professional image positively.`,
      conversationHistory: [],
      maxHistoryLength: 10 // Keep last 10 exchanges for context
    };
  }

  /**
   * Get available models from Ollama
   */
  async getModels() {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`);
      return response.data;
    } catch (error) {
      console.error('[Ollama Service] Error fetching models:', error);
      throw new Error('Failed to fetch available models from Ollama');
    }
  }

  /**
   * Add context to messages by prepending system message and managing conversation history
   */
  private addContextToMessages(
    messages: OllamaMessage[], 
    context?: Partial<ConversationContext>
  ): OllamaMessage[] {
    const finalContext = { ...this.defaultContext, ...context };
    
    // Start with system message
    const contextualizedMessages: OllamaMessage[] = [
      { role: 'system', content: finalContext.systemMessage }
    ];
    
    // Add conversation history for context
    if (finalContext.conversationHistory.length > 0) {
      contextualizedMessages.push(...finalContext.conversationHistory);
    }
    
    // Add current messages
    contextualizedMessages.push(...messages);
    
    return contextualizedMessages;
  }

  /**
   * Update conversation history with new exchange
   */
  private updateConversationHistory(
    userMessages: OllamaMessage[],
    assistantResponse: string,
    context?: Partial<ConversationContext>
  ): OllamaMessage[] {
    const finalContext = { ...this.defaultContext, ...context };
    const history = [...finalContext.conversationHistory];
    
    // Add user messages
    history.push(...userMessages);
    
    // Add assistant response
    history.push({ role: 'assistant', content: assistantResponse });
    
    // Keep only the last maxHistoryLength exchanges (2 messages per exchange)
    const maxMessages = finalContext.maxHistoryLength * 2;
    if (history.length > maxMessages) {
      return history.slice(-maxMessages);
    }
    
    return history;
  }

  /**
   * Generate a chat completion using Ollama with context
   */
  async generateChatCompletion(
    messages: OllamaMessage[],
    model?: string,
    options?: OllamaRequest['options'],
    context?: Partial<ConversationContext>
  ): Promise<{ response: string; updatedContext: ConversationContext }> {
    // Add context to messages
    const contextualizedMessages = this.addContextToMessages(messages, context);
    
    const requestPayload: OllamaRequest = {
      model: model || this.defaultModel,
      messages: contextualizedMessages,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        ...options,
      },
    };

    try {
      console.log(`[Ollama Service] Sending request to model: ${requestPayload.model}`);
      console.log(`[Ollama Service] Messages count: ${contextualizedMessages.length} (with context)`);
      
      const response = await axios.post<OllamaResponse>(
        `${this.baseURL}/api/chat`,
        requestPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 60000, // 60 second timeout
        }
      );

      const result = response.data;
      console.log(`[Ollama Service] Response received in ${result.total_duration}ms`);
      
      const assistantResponse = result.message.content;
      
      // Update conversation history
      const updatedHistory = this.updateConversationHistory(messages, assistantResponse, context);
      const updatedContext: ConversationContext = {
        systemMessage: context?.systemMessage || this.defaultContext.systemMessage,
        conversationHistory: updatedHistory,
        maxHistoryLength: context?.maxHistoryLength || this.defaultContext.maxHistoryLength
      };
      
      return {
        response: assistantResponse,
        updatedContext
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('[Ollama Service] Axios error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
        
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Ollama is not running. Please start Ollama on localhost:11434');
        }
        
        if (error.response?.status === 404) {
          throw new Error(`Model '${requestPayload.model}' not found. Please pull the model first.`);
        }
        
        throw new Error(`Ollama API Error: ${error.response?.data?.error || error.message}`);
      } else {
        console.error('[Ollama Service] Unexpected error:', error);
        throw new Error('Unexpected error occurred while communicating with Ollama');
      }
    }
  }

  /**
   * Stream chat completion with context (for real-time responses)
   */
  async *streamChatCompletion(
    messages: OllamaMessage[],
    model?: string,
    options?: OllamaRequest['options'],
    context?: Partial<ConversationContext>
  ): AsyncGenerator<{ content: string; isComplete: boolean; updatedContext?: ConversationContext }> {
    // Add context to messages
    const contextualizedMessages = this.addContextToMessages(messages, context);
    
    const requestPayload: OllamaRequest = {
      model: model || this.defaultModel,
      messages: contextualizedMessages,
      stream: true,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        ...options,
      },
    };

    let fullResponse = '';
    let isComplete = false;

    try {
      const response = await axios.post(
        `${this.baseURL}/api/chat`,
        requestPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'stream',
          timeout: 60000,
        }
      );

      for await (const chunk of response.data) {
        const lines = chunk.toString().split('\n').filter((line: string) => line.trim());
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              isComplete = true;
              
              // Update conversation history with full response
              const updatedHistory = this.updateConversationHistory(messages, fullResponse, context);
              const updatedContext: ConversationContext = {
                systemMessage: context?.systemMessage || this.defaultContext.systemMessage,
                conversationHistory: updatedHistory,
                maxHistoryLength: context?.maxHistoryLength || this.defaultContext.maxHistoryLength
              };
              
              yield { content: '', isComplete: true, updatedContext };
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.message?.content) {
                const content = parsed.message.content;
                fullResponse += content;
                yield { content, isComplete: false };
              }
            } catch (e) {
              console.warn('[Ollama Service] Failed to parse streaming response:', e);
            }
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Ollama is not running. Please start Ollama on localhost:11434');
        }
        throw new Error(`Ollama API Error: ${error.response?.data?.error || error.message}`);
      } else {
        throw new Error('Unexpected error occurred while streaming from Ollama');
      }
    }
  }

  /**
   * Check if Ollama is running and accessible
   */
  async healthCheck(): Promise<boolean> {
    try {
      await axios.get(`${this.baseURL}/api/tags`, { timeout: 5000 });
      return true;
    } catch (error) {
      console.error('[Ollama Service] Health check failed:', error);
      return false;
    }
  }

  /**
   * Get default context
   */
  getDefaultContext(): ConversationContext {
    return { ...this.defaultContext };
  }

  /**
   * Update system message
   */
  updateSystemMessage(newSystemMessage: string): void {
    this.defaultContext.systemMessage = newSystemMessage;
  }

  /**
   * Clear conversation history
   */
  clearConversationHistory(): void {
    this.defaultContext.conversationHistory = [];
  }
}

// Export a singleton instance
export const ollamaService = new OllamaService(); 