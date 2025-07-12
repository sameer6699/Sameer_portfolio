// Simple test script to verify chat API is working
const testChatAPI = async () => {
  try {
    console.log('Testing chat API...');
    
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello, how are you?' }
        ],
        sessionId: 'test-session-123',
        context: {
          language: 'english',
          systemMessage: 'You are Sam AI, a friendly assistant.'
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Chat API is working!');
      console.log('Response:', data);
    } else {
      console.log('❌ Chat API returned error:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('Error details:', errorText);
    }
  } catch (error) {
    console.log('❌ Failed to connect to chat API:', error.message);
  }
};

// Test health endpoint
const testHealthAPI = async () => {
  try {
    console.log('Testing health API...');
    
    const response = await fetch('http://localhost:5000/api/chat/health');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Health API is working!');
      console.log('Health status:', data);
    } else {
      console.log('❌ Health API returned error:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ Failed to connect to health API:', error.message);
  }
};

// Run tests
console.log('🚀 Starting API tests...\n');

testHealthAPI().then(() => {
  setTimeout(() => {
    testChatAPI();
  }, 1000);
}); 