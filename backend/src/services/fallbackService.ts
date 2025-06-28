import { AbuseDetectionService } from './abuseDetectionService';

interface FallbackResponse {
  response: string;
  context: string;
}

export class FallbackService {
  private static readonly FALLBACK_RESPONSES: Record<string, FallbackResponse[]> = {
    greetings: [
      {
        response: "Hello! I'm Sam AI, Sameer's portfolio assistant. I'm here to help you learn about Sameer's skills, projects, and experience. What would you like to know?",
        context: "General greeting response"
      },
      {
        response: "Hi there! 👋 I'm Sam AI, your friendly guide to Sameer's portfolio. How can I assist you today?",
        context: "Casual greeting with emoji"
      },
      {
        response: "Greetings! I'm Sam AI, ready to help you explore Sameer's professional journey and achievements. What interests you?",
        context: "Professional greeting"
      }
    ],
    about_sameer: [
      {
        response: "Sameer is a passionate software developer with expertise in full-stack development, cloud technologies, and modern web frameworks. He has experience with React, Node.js, TypeScript, and various cloud platforms.",
        context: "General introduction about Sameer"
      },
      {
        response: "Sameer is a skilled developer who loves creating innovative solutions. He's worked on various projects using technologies like React, Node.js, and cloud services. He's also participated in programs like Google Summer of Code!",
        context: "Detailed introduction with achievements"
      }
    ],
    skills: [
      {
        response: "Sameer's key skills include: Frontend (React, TypeScript, Tailwind CSS), Backend (Node.js, Express, MongoDB), Cloud (AWS, Google Cloud), and DevOps (Docker, Git). He's also experienced with Python and various databases.",
        context: "Technical skills overview"
      },
      {
        response: "Sameer excels in modern web development technologies. His frontend skills include React and TypeScript, while his backend expertise covers Node.js and databases. He's also proficient in cloud platforms and DevOps practices.",
        context: "Skills categorized by area"
      }
    ],
    projects: [
      {
        response: "Sameer has worked on several interesting projects including this portfolio website, various web applications, and contributions to open-source projects. He's particularly proud of his work on scalable backend systems and user-friendly frontend interfaces.",
        context: "General project overview"
      },
      {
        response: "Some of Sameer's notable projects include this interactive portfolio, full-stack web applications, and contributions to the open-source community. He focuses on creating solutions that are both functional and user-friendly.",
        context: "Project highlights"
      }
    ],
    experience: [
      {
        response: "Sameer has gained experience through internships, freelance work, and personal projects. He's participated in Google Summer of Code and various hackathons, constantly learning and improving his skills.",
        context: "Experience overview"
      },
      {
        response: "Sameer's experience includes working on real-world projects, contributing to open-source, and participating in prestigious programs like GSOC. He's always eager to take on new challenges and learn new technologies.",
        context: "Detailed experience"
      }
    ],
    contact: [
      {
        response: "You can reach out to Sameer through LinkedIn, GitHub, or email. He's always open to discussing new opportunities, collaborations, or just having a chat about technology!",
        context: "Contact information"
      },
      {
        response: "Sameer is active on professional platforms like LinkedIn and GitHub. Feel free to connect with him there, or send him an email. He loves connecting with fellow developers and tech enthusiasts!",
        context: "Professional contact"
      }
    ],
    technical_help: [
      {
        response: "I'd be happy to help with technical questions! Sameer has experience with various technologies and programming concepts. What specific area would you like to discuss?",
        context: "Technical assistance offer"
      },
      {
        response: "For technical questions, I can share insights based on Sameer's experience with web development, cloud technologies, and software engineering best practices. What would you like to know?",
        context: "Technical expertise offer"
      }
    ],
    default: [
      {
        response: "I'm here to help you learn about Sameer's skills, projects, and experience. Feel free to ask about his technical expertise, projects he's worked on, or how to get in touch with him!",
        context: "Default helpful response"
      },
      {
        response: "That's an interesting question! While I'm currently in fallback mode, I can still help you learn about Sameer's background, skills, and projects. What would you like to know?",
        context: "Fallback mode explanation"
      }
    ]
  };

  private static readonly KEYWORDS: Record<string, string[]> = {
    greetings: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'],
    about_sameer: ['who', 'about', 'tell me about', 'introduce', 'background', 'story'],
    skills: ['skills', 'technologies', 'programming', 'languages', 'frameworks', 'tools', 'expertise', 'what can', 'capabilities'],
    projects: ['projects', 'work', 'portfolio', 'applications', 'apps', 'built', 'created', 'developed'],
    experience: ['experience', 'work history', 'career', 'internship', 'jobs', 'positions', 'background'],
    contact: ['contact', 'reach', 'email', 'linkedin', 'github', 'social', 'connect', 'get in touch'],
    technical_help: ['help', 'problem', 'issue', 'debug', 'code', 'programming', 'technical', 'development', 'how to']
  };

  /**
   * Analyze user message and return appropriate fallback response
   */
  static getFallbackResponse(userMessage: string, language: string = 'english'): string {
    const message = userMessage.toLowerCase().trim();
    
    // Determine the category based on keywords
    const category = this.categorizeMessage(message);
    
    // Get responses for the category
    const responses = this.FALLBACK_RESPONSES[category] || this.FALLBACK_RESPONSES.default;
    
    // Select a random response from the category
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add language-specific prefix if not English
    if (language !== 'english') {
      return `[${language.toUpperCase()}] ${selectedResponse.response}`;
    }
    
    return selectedResponse.response;
  }

  /**
   * Categorize user message based on keywords
   */
  private static categorizeMessage(message: string): string {
    for (const [category, keywords] of Object.entries(this.KEYWORDS)) {
      for (const keyword of keywords) {
        if (message.includes(keyword)) {
          return category;
        }
      }
    }
    return 'default';
  }

  /**
   * Get a smart fallback response with context awareness
   */
  static getSmartFallbackResponse(
    userMessage: string, 
    conversationHistory: any[] = [], 
    language: string = 'english'
  ): string {
    // Check for abusive language first
    const abuseCheck = AbuseDetectionService.handleAbusiveMessage(userMessage, language);
    if (abuseCheck.shouldRespond && abuseCheck.response) {
      console.log('[Fallback Service] Abusive language detected in fallback mode');
      return abuseCheck.response;
    }

    const message = userMessage.toLowerCase().trim();
    
    // Check if this is a follow-up question based on conversation history
    if (conversationHistory.length > 0) {
      const lastExchange = conversationHistory.slice(-2);
      if (lastExchange.length === 2) {
        const lastAIResponse = lastExchange[1]?.content || '';
        
        // If last response was about skills, provide more specific skill info
        if (lastAIResponse.includes('skills') || lastAIResponse.includes('technologies')) {
          return "Some of Sameer's specific technical skills include React for frontend development, Node.js for backend services, TypeScript for type-safe coding, and experience with cloud platforms like AWS and Google Cloud. He's also proficient in database management and DevOps practices.";
        }
        
        // If last response was about projects, provide more project details
        if (lastAIResponse.includes('projects') || lastAIResponse.includes('work')) {
          return "Sameer has worked on projects ranging from full-stack web applications to mobile apps and cloud infrastructure. He particularly enjoys building scalable solutions and has experience with microservices architecture and modern development practices.";
        }
      }
    }
    
    // Check for specific technical questions
    if (message.includes('react') || message.includes('frontend')) {
      return "Sameer has extensive experience with React and modern frontend development. He's worked with React hooks, state management, and building responsive user interfaces. He also uses TypeScript for better code quality and maintainability.";
    }
    
    if (message.includes('node') || message.includes('backend')) {
      return "Sameer is proficient in Node.js and backend development. He's built RESTful APIs, worked with databases like MongoDB and PostgreSQL, and implemented authentication and authorization systems. He also has experience with Express.js and other Node.js frameworks.";
    }
    
    if (message.includes('cloud') || message.includes('aws') || message.includes('google')) {
      return "Sameer has experience with cloud platforms including AWS and Google Cloud. He's worked on deploying applications, managing cloud infrastructure, and implementing cloud-native solutions. He understands containerization with Docker and CI/CD pipelines.";
    }
    
    // Default to categorized response
    return this.getFallbackResponse(userMessage, language);
  }

  /**
   * Get a fallback response for specific error scenarios
   */
  static getErrorFallbackResponse(errorType: string, language: string = 'english'): string {
    const errorResponses: Record<string, string> = {
      'connection': "I'm having trouble connecting to my AI brain right now, but I can still help you learn about Sameer! What would you like to know about his skills, projects, or experience?",
      'timeout': "My response is taking longer than expected, but I'm here to help! Let me tell you about Sameer's background and expertise. What interests you most?",
      'service_unavailable': "My AI service is temporarily unavailable, but I can still provide information about Sameer's portfolio. Feel free to ask about his skills, projects, or how to get in touch!",
      'default': "I'm currently in fallback mode, but I can still assist you with information about Sameer's professional background and achievements. What would you like to know?"
    };
    
    const response = errorResponses[errorType] || errorResponses.default;
    
    if (language !== 'english') {
      return `[${language.toUpperCase()}] ${response}`;
    }
    
    return response;
  }
} 