const mongoose = require('mongoose');
require('dotenv').config();

// Import services
const { rateLimitService } = require('./dist/services/rateLimitService');
const { cacheService } = require('./dist/services/cacheService');
const { callGemini } = require('./dist/services/chatService');

async function testRateLimitSystem() {
  try {
    console.log('🧪 Testing Rate Limit and Caching System...\n');
    
    // Test 1: Rate Limiting
    console.log('📊 Test 1: Rate Limiting');
    const sessionId = 'test-session-123';
    
    // Test multiple requests
    for (let i = 1; i <= 20; i++) {
      const result = rateLimitService.canMakeRequest(sessionId);
      console.log(`Request ${i}: ${result.allowed ? '✅ Allowed' : '❌ Blocked'} ${result.reason || ''}`);
      
      if (!result.allowed) {
        console.log(`⏰ Wait time: ${Math.ceil(result.waitTime / 1000)} seconds`);
        break;
      }
    }
    
    // Test 2: Rate Limit Status
    console.log('\n📈 Test 2: Rate Limit Status');
    const status = rateLimitService.getRateLimitStatus(sessionId);
    console.log('Rate Limit Status:', status);
    
    // Test 3: Caching
    console.log('\n💾 Test 3: Caching System');
    const testMessages = [{ role: 'user', content: 'Hello SAM AI!' }];
    const testContext = { language: 'english' };
    
    // Cache a response
    const testResponse = "Hi there! I'm SAM AI, Sameer's personal assistant. How can I help you today?";
    cacheService.cacheResponse(testMessages, testResponse, testContext);
    
    // Try to get cached response
    const cachedResponse = cacheService.getCachedResponse(testMessages, testContext);
    console.log('Cached Response:', cachedResponse ? '✅ Found' : '❌ Not found');
    
    // Test 4: Cache Statistics
    console.log('\n📊 Test 4: Cache Statistics');
    const cacheStats = cacheService.getStats();
    console.log('Cache Stats:', cacheStats);
    
    // Test 5: MongoDB Connection (if available)
    console.log('\n🗄️ Test 5: MongoDB Connection');
    const mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
      try {
        await mongoose.connect(mongoUri);
        console.log('✅ MongoDB Atlas connected successfully');
        await mongoose.disconnect();
        console.log('🔌 MongoDB Atlas disconnected');
      } catch (error) {
        console.log('❌ MongoDB connection failed:', error.message);
      }
    } else {
      console.log('⚠️ MONGO_URI not found in environment variables');
    }
    
    console.log('\n🎉 Rate Limit and Caching System Test Complete!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Test rate limit error handling
function testRateLimitErrorHandling() {
  console.log('\n🚨 Test 6: Rate Limit Error Handling');
  
  const sessionId = 'error-test-session';
  
  // Simulate rate limit error
  rateLimitService.handleRateLimitError(sessionId, 60); // 60 seconds
  
  const status = rateLimitService.getRateLimitStatus(sessionId);
  console.log('After rate limit error:', status);
  
  // Test if blocked
  const canRequest = rateLimitService.canMakeRequest(sessionId);
  console.log('Can make request after error:', canRequest.allowed);
}

// Run tests
async function runAllTests() {
  await testRateLimitSystem();
  testRateLimitErrorHandling();
  
  console.log('\n✨ All tests completed!');
  console.log('\n📋 Summary:');
  console.log('- Rate limiting: Prevents API abuse');
  console.log('- Caching: Reduces API calls');
  console.log('- Fallback responses: Ensures user experience');
  console.log('- Error handling: Graceful degradation');
}

runAllTests(); 