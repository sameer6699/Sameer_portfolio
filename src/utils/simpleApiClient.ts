/**
 * Simple API Client for Chat
 * This is a simplified version that will work reliably
 */

interface ChatRequest {
  messages: { role: string; content: string }[];
  sessionId?: string;
  context?: any;
}

interface ChatResponse {
  response: string;
  sessionId?: string;
  context?: any;
  updatedContext?: any;
  isFallback?: boolean;
  fallbackMessage?: string;
}

/**
 * Simple POST request to chat API
 */
export const simpleChatAPI = async (data: ChatRequest): Promise<ChatResponse> => {
  try {
    // In development, use the Vite proxy
    const baseURL = import.meta.env.DEV ? '' : import.meta.env.VITE_BACKEND_URL || '';
    const url = `${baseURL}/api/chat`;
    
    console.log('Making request to:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return a fallback response
    return {
      response: "I'm Sam AI, Sameer's portfolio assistant! I'm currently experiencing technical difficulties, but I can tell you that Sameer is a skilled software developer with expertise in React, Node.js, TypeScript, and cloud technologies. Feel free to explore his portfolio for more information!",
      isFallback: true,
      fallbackMessage: "Network error - using fallback response"
    };
  }
}; 