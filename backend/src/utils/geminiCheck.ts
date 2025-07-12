import { GeminiService } from '../services/geminiService';

let geminiService: GeminiService | null = null;

export const initializeGeminiService = () => {
  try {
    geminiService = new GeminiService();
    console.log('✅ Gemini service initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize Gemini service:', error);
    return false;
  }
};

export const checkGeminiStatus = async (): Promise<{
  status: 'online' | 'offline' | 'error';
  message: string;
  details?: any;
}> => {
  try {
    if (!geminiService) {
      const initialized = initializeGeminiService();
      if (!initialized) {
        return {
          status: 'error',
          message: 'Failed to initialize Gemini service'
        };
      }
    }

    if (!geminiService) {
      return {
        status: 'error',
        message: 'Gemini service not available'
      };
    }

    // Test the API with a simple request
    const isHealthy = await geminiService.healthCheck();
    
    if (isHealthy) {
      console.log('✅ Gemini API is online and responding');
      return {
        status: 'online',
        message: 'Gemini API is online and responding'
      };
    } else {
      console.log('❌ Gemini API health check failed');
      return {
        status: 'offline',
        message: 'Gemini API health check failed'
      };
    }
  } catch (error) {
    console.error('❌ Error checking Gemini status:', error);
    return {
      status: 'error',
      message: `Error checking Gemini status: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: error
    };
  }
};

export const getGeminiService = (): GeminiService | null => {
  return geminiService;
};

export const checkGeminiOnStartup = async () => {
  console.log('🔍 Checking Gemini API status on startup...');
  const status = await checkGeminiStatus();
  
  if (status.status === 'online') {
    console.log('✅ Gemini API is ready for use');
  } else {
    console.warn('⚠️ Gemini API is not available:', status.message);
  }
  
  return status;
}; 