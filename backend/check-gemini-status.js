const { GeminiService } = require('./dist/services/geminiService');
require('dotenv').config();

async function checkGeminiStatus() {
  console.log('🔍 Checking Gemini API Status...\n');
  
  try {
    // Check environment variables
    console.log('📋 Environment Check:');
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log('❌ GEMINI_API_KEY not found in environment variables');
      return;
    }
    console.log('✅ GEMINI_API_KEY found');
    console.log('🔑 API Key (first 10 chars):', apiKey.substring(0, 10) + '...');
    
    // Create Gemini service instance
    const geminiService = new GeminiService();
    
    // Test health check
    console.log('\n🏥 Health Check:');
    const isHealthy = await geminiService.healthCheck();
    console.log('Gemini Health:', isHealthy ? '✅ Healthy' : '❌ Unhealthy');
    
    // Test model availability
    console.log('\n🤖 Model Check:');
    try {
      const models = await geminiService.getModels();
      console.log('Available Models:', models);
    } catch (error) {
      console.log('❌ Model check failed:', error.message);
    }
    
    // Test simple request
    console.log('\n🧪 Test Request:');
    try {
      const testMessages = [{ role: 'user', content: 'Hello' }];
      const result = await geminiService.generateChatCompletion(testMessages);
      console.log('✅ Test request successful');
      console.log('Response:', result.response.substring(0, 100) + '...');
    } catch (error) {
      console.log('❌ Test request failed:', error.message);
      
      // Check for specific error types
      if (error.message.includes('429')) {
        console.log('🚨 Rate limit exceeded - wait 1 minute and try again');
      } else if (error.message.includes('401')) {
        console.log('🔑 API key invalid - check your GEMINI_API_KEY');
      } else if (error.message.includes('403')) {
        console.log('🚫 API key doesn\'t have permission - check quota');
      } else if (error.message.includes('timeout')) {
        console.log('⏰ Request timeout - check internet connection');
      }
    }
    
  } catch (error) {
    console.error('❌ Status check failed:', error.message);
  }
  
  console.log('\n📊 Summary:');
  console.log('- Check your GEMINI_API_KEY in .env file');
  console.log('- Verify quota in Google AI Studio');
  console.log('- Wait if rate limited (usually 1 minute)');
  console.log('- Check internet connection');
}

checkGeminiStatus(); 