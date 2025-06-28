const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testOllamaIntegration() {
  console.log('🧪 Testing Ollama Integration with Context...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${BASE_URL}/api/chat/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    console.log('');

    // Test 2: Get Available Models
    console.log('2. Testing models endpoint...');
    const modelsResponse = await axios.get(`${BASE_URL}/api/chat/models`);
    console.log('✅ Models retrieved:', modelsResponse.data);
    console.log('');

    // Test 3: Get Available Contexts
    console.log('3. Testing contexts endpoint...');
    const contextsResponse = await axios.get(`${BASE_URL}/api/contexts`);
    console.log('✅ Contexts retrieved:', contextsResponse.data);
    console.log('');

    // Test 4: Simple Chat with Context
    console.log('4. Testing chat with context...');
    const sessionId = 'test-session-' + Date.now();
    const chatResponse = await axios.post(`${BASE_URL}/api/chat`, {
      messages: [
        { role: 'user', content: 'Hello! Can you tell me about Sameer\'s skills?' }
      ],
      sessionId: sessionId,
      context: {
        systemMessage: contextsResponse.data.contexts[0].systemMessage,
        maxHistoryLength: 5
      }
    });
    console.log('✅ Chat response received:');
    console.log('Response:', chatResponse.data.response);
    console.log('Session ID:', chatResponse.data.sessionId);
    console.log('');

    // Test 5: Follow-up message to test conversation history
    console.log('5. Testing follow-up message...');
    const followUpResponse = await axios.post(`${BASE_URL}/api/chat`, {
      messages: [
        { role: 'user', content: 'What about his experience with React?' }
      ],
      sessionId: sessionId
    });
    console.log('✅ Follow-up response received:');
    console.log('Response:', followUpResponse.data.response);
    console.log('');

    // Test 6: Get Session Context
    console.log('6. Testing session context retrieval...');
    const sessionContextResponse = await axios.get(`${BASE_URL}/api/chat/session/${sessionId}`);
    console.log('✅ Session context retrieved:', sessionContextResponse.data);
    console.log('');

    // Test 7: Clear Session
    console.log('7. Testing session clearing...');
    const clearSessionResponse = await axios.delete(`${BASE_URL}/api/chat/session/${sessionId}`);
    console.log('✅ Session cleared:', clearSessionResponse.data);
    console.log('');

    console.log('🎉 All tests passed! Ollama integration with context is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure:');
      console.log('1. The backend is running: npm run dev');
      console.log('2. Ollama is running: ollama serve');
      console.log('3. You have pulled a model: ollama pull llama2');
    }
    
    if (error.response) {
      console.log('Response data:', error.response.data);
    }
  }
}

// Run the test
testOllamaIntegration(); 