import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface ConversationContext {
  systemMessage: string;
  conversationHistory: GeminiMessage[];
  maxHistoryLength: number;
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private defaultModel: string;
  private defaultContext: ConversationContext;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is required in environment variables');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.defaultModel = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    
    // Enhanced system message for portfolio assistant with comprehensive information
    this.defaultContext = {
      systemMessage: `You are SAM AI - Sameer's Personal AI Assistant. You are Sameer's dedicated AI companion, designed to represent him and assist visitors with information about his work, skills, and services.

CORE IDENTITY:
You are SAM AI (Sameer's AI) - Sameer's personal AI assistant and digital representative. You speak on his behalf and help visitors understand his capabilities, projects, and how to work with him.

ABOUT SAMEER JADHAV:
Sameer is a passionate software developer with expertise in modern web technologies. He's currently pursuing his education while actively contributing to open source projects and building innovative solutions.

TECHNICAL SKILLS & EXPERTISE:
Frontend: React.js, TypeScript, Next.js, Tailwind CSS, Framer Motion, Vite
Backend: Node.js, Express.js, TypeScript, RESTful APIs
Database: MongoDB, PostgreSQL, Firebase
Cloud & DevOps: AWS, Google Cloud Platform, Firebase, Docker
Design Tools: Figma, Adobe XD
Version Control: Git, GitHub
Other: LangChain, AI/ML integration, WebRTC, Socket.io

ACHIEVEMENTS & RECOGNITIONS:
• Google Summer of Code (GSOC) 2024 Participant - Contributing to open source projects
• GirlScript Summer of Code (GSSOC) Participant - Active open source contributor
• HackerRank & LeetCode - Strong problem-solving skills
• Multiple hackathons and coding competitions

PROJECTS & EXPERIENCE:
Freelancing Projects:
• E-Commerce Platform - Full-stack solution with React, Node.js, Stripe integration
• Task Management App - Collaborative tool with real-time updates
• Social Media App - Full-featured platform with posts, comments, chat

Academic Projects:
• AI-powered applications using LangChain and modern AI APIs
• Real-time communication systems with WebRTC
• Database management systems

Open Source Contributions:
• Active contributor to various open source projects
• GSOC 2024 participation with significant contributions
• Community-driven development experience

EDUCATION & BACKGROUND:
• Currently pursuing computer science education
• Self-taught developer with strong practical experience
• Continuous learner with focus on emerging technologies

PERSONALITY & APPROACH:
• Enthusiastic about technology and innovation
• Strong problem-solving and analytical skills
• Collaborative team player with leadership experience
• Passionate about creating user-friendly, scalable solutions
• Always eager to learn new technologies and frameworks

SERVICES OFFERED:
• Web Application Development (Full-stack)
• Mobile App Development (React Native)
• UI/UX Design and Implementation
• API Development and Integration
• Cloud Infrastructure Setup
• Technical Consulting and Project Planning

SAM AI PERSONALITY & ROLE:
- You are SAM AI - Sameer's Personal AI Assistant and digital representative
- You speak on Sameer's behalf and represent his interests, skills, and services
- You have a friendly, conversational tone with witty dark humor
- You're knowledgeable about all aspects of Sameer's work and experience
- You can help with technical questions, project discussions, and general inquiries
- You maintain professionalism while being approachable and engaging
- You can discuss Sameer's skills, projects, achievements, and services
- You can help visitors understand Sameer's capabilities and how to work with him
- You have a subtle dark sense of humor - use it sparingly but effectively
- You can make clever, slightly edgy jokes about coding, bugs, deadlines, and tech life
- Keep the humor light and not offensive - think "programmer humor" and "tech memes"
- Use humor to make technical discussions more engaging and relatable
- Always introduce yourself as "SAM AI, Sameer's Personal AI Assistant" when appropriate

RESPONSE GUIDELINES:
- Keep responses ULTRA SHORT and CRISP (1-2 sentences maximum)
- Keep greetings to 1 sentence only
- Provide direct answers in 1-2 sentences max
- Be extremely concise - no fluff or unnecessary details
- For technical questions, give 1-sentence answers
- For questions about Sameer, provide only key points in 1-2 sentences
- Use bullet points sparingly - prefer short lists
- ALWAYS respond in a friendly, warm manner - match the user's tone
- If user is casual/friendly, respond with warmth and enthusiasm
- Use emojis occasionally to show friendliness (but sparingly)
- Be approachable and engaging while staying extremely concise
- If asked about unrelated topics, politely redirect to portfolio-relevant subjects
- Use a conversational tone that reflects SAM AI's personality
- Incorporate subtle dark humor when appropriate (coding jokes, bug references, deadline humor)
- Keep humor light and relatable - think "it works on my machine" type jokes
- Use humor to make technical topics more engaging without being unprofessional
- NEVER write long paragraphs or detailed explanations
- Focus on being helpful and quick, not comprehensive

SPECIFIC TOPICS YOU CAN DISCUSS:
• Sameer's technical skills and expertise
• His projects (freelancing, academic, open source)
• His achievements (GSOC, GSSOC, competitions)
• His services and how to work with him
• Technology discussions and trends
• Portfolio navigation and features
• Contact and collaboration opportunities

Remember: You are SAM AI - Sameer's Personal AI Assistant! You represent Sameer and help visitors connect with his work. Keep responses ULTRA SHORT (1-2 sentences max) and impactful while being warm and approachable! Sprinkle in programmer humor when appropriate, but keep it brief! 😄`,
      conversationHistory: [],
      maxHistoryLength: 10 // Keep last 10 exchanges for context
    };
  }

  /**
   * Convert user messages to Gemini format
   */
  private convertToGeminiFormat(messages: { role: string; content: string }[]): GeminiMessage[] {
    return messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
  }

  /**
   * Add context to messages by prepending system message and managing conversation history
   */
  private addContextToMessages(
    messages: { role: string; content: string }[], 
    context?: Partial<ConversationContext>
  ): { role: string; parts: { text: string }[] }[] {
    const finalContext = { ...this.defaultContext, ...context };
    
    // Start with system message
    const contextualizedMessages: { role: string; parts: { text: string }[] }[] = [
      { role: 'user', parts: [{ text: finalContext.systemMessage }] }
    ];
    
    // Add conversation history for context
    if (finalContext.conversationHistory.length > 0) {
      contextualizedMessages.push(...finalContext.conversationHistory);
    }
    
    // Add current messages
    contextualizedMessages.push(...this.convertToGeminiFormat(messages));
    
    return contextualizedMessages;
  }

  /**
   * Update conversation history with new exchange
   */
  private updateConversationHistory(
    userMessages: { role: string; content: string }[],
    assistantResponse: string,
    context?: Partial<ConversationContext>
  ): GeminiMessage[] {
    const finalContext = { ...this.defaultContext, ...context };
    const history = [...finalContext.conversationHistory];
    
    // Add user messages
    history.push(...this.convertToGeminiFormat(userMessages));
    
    // Add assistant response
    history.push({ role: 'model', parts: [{ text: assistantResponse }] });
    
    // Keep only the last maxHistoryLength exchanges (2 messages per exchange)
    const maxMessages = finalContext.maxHistoryLength * 2;
    if (history.length > maxMessages) {
      return history.slice(-maxMessages);
    }
    
    return history;
  }

  /**
   * Generate a chat completion using Gemini
   */
  async generateChatCompletion(
    messages: { role: string; content: string }[],
    model?: string,
    options?: {
      temperature?: number;
      topP?: number;
      topK?: number;
      maxOutputTokens?: number;
    },
    context?: Partial<ConversationContext>
  ): Promise<{ response: string; updatedContext: ConversationContext }> {
    try {
      const modelName = model || this.defaultModel;
      const geminiModel = this.genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: options?.temperature || 0.7,
          topP: options?.topP || 0.9,
          topK: options?.topK || 40,
          maxOutputTokens: options?.maxOutputTokens || 1000,
        }
      });

      // Create chat session
      const chat = geminiModel.startChat({
        history: context?.conversationHistory || [],
        generationConfig: {
          temperature: options?.temperature || 0.7,
          topP: options?.topP || 0.9,
          topK: options?.topK || 40,
          maxOutputTokens: options?.maxOutputTokens || 1000,
        }
      });

      // Get the last user message
      const lastMessage = messages[messages.length - 1];
      const userMessage = lastMessage?.content || '';
      
      console.log(`[Gemini Service] Sending request to model: ${modelName}`);
      console.log(`[Gemini Service] User message: ${userMessage}`);
      
      // Send message and get response
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();
      
      console.log(`[Gemini Service] Response received successfully`);
      
      // Update conversation history
      const updatedHistory = this.updateConversationHistory(messages, text, context);
      const updatedContext: ConversationContext = {
        systemMessage: context?.systemMessage || this.defaultContext.systemMessage,
        conversationHistory: updatedHistory,
        maxHistoryLength: context?.maxHistoryLength || this.defaultContext.maxHistoryLength
      };
      
      return { response: text, updatedContext };
      
    } catch (error) {
      console.error('[Gemini Service] Error generating chat completion:', error);
      throw new Error(`Failed to generate chat completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Stream chat completion (for real-time responses)
   */
  async *streamChatCompletion(
    messages: { role: string; content: string }[],
    model?: string,
    options?: {
      temperature?: number;
      topP?: number;
      topK?: number;
      maxOutputTokens?: number;
    },
    context?: Partial<ConversationContext>
  ): AsyncGenerator<{ content: string; isComplete: boolean; updatedContext?: ConversationContext }> {
    try {
      const modelName = model || this.defaultModel;
      const geminiModel = this.genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: options?.temperature || 0.7,
          topP: options?.topP || 0.9,
          topK: options?.topK || 40,
          maxOutputTokens: options?.maxOutputTokens || 1000,
        }
      });

      // Create chat session
      const chat = geminiModel.startChat({
        history: context?.conversationHistory || [],
        generationConfig: {
          temperature: options?.temperature || 0.7,
          topP: options?.topP || 0.9,
          topK: options?.topK || 40,
          maxOutputTokens: options?.maxOutputTokens || 1000,
        }
      });

      // Get the last user message
      const lastMessage = messages[messages.length - 1];
      const userMessage = lastMessage?.content || '';
      
      console.log(`[Gemini Service] Streaming request to model: ${modelName}`);
      
      // Send message and get streaming response
      const result = await chat.sendMessageStream(userMessage);
      let fullResponse = '';
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        
        yield {
          content: chunkText,
          isComplete: false
        };
      }
      
      // Update conversation history with full response
      const updatedHistory = this.updateConversationHistory(messages, fullResponse, context);
      const updatedContext: ConversationContext = {
        systemMessage: context?.systemMessage || this.defaultContext.systemMessage,
        conversationHistory: updatedHistory,
        maxHistoryLength: context?.maxHistoryLength || this.defaultContext.maxHistoryLength
      };
      
      yield {
        content: '',
        isComplete: true,
        updatedContext
      };
      
    } catch (error) {
      console.error('[Gemini Service] Error streaming chat completion:', error);
      throw new Error(`Failed to stream chat completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Health check for Gemini API
   */
  async healthCheck(): Promise<boolean> {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.defaultModel });
      const result = await model.generateContent('Hello');
      await result.response;
      return true;
    } catch (error) {
      console.error('[Gemini Service] Health check failed:', error);
      return false;
    }
  }

  /**
   * Get available models (Gemini doesn't have a models list API like OpenAI)
   */
  async getModels(): Promise<{ models: string[] }> {
    return {
      models: [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-1.0-pro'
      ]
    };
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