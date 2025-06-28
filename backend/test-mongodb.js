const mongoose = require('mongoose');

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/Sameer_Portfolio';

async function testMongoDB() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test the Chat model
    const Chat = mongoose.model('Sam_AI', new mongoose.Schema({
      sessionId: String,
      userMessage: String,
      aiResponse: String,
      timestamp: { type: Date, default: Date.now },
      context: mongoose.Schema.Types.Mixed
    }));
    
    // Create a test chat entry
    const testChat = new Chat({
      sessionId: 'test-session-123',
      userMessage: 'Hello, this is a test message',
      aiResponse: 'Hello! This is a test AI response.',
      context: { test: true }
    });
    
    await testChat.save();
    console.log('✅ Test chat saved to database!');
    
    // Retrieve the test chat
    const retrievedChat = await Chat.findOne({ sessionId: 'test-session-123' });
    console.log('✅ Test chat retrieved:', retrievedChat);
    
    // Clean up test data
    await Chat.deleteOne({ sessionId: 'test-session-123' });
    console.log('✅ Test data cleaned up!');
    
    console.log('🎉 MongoDB integration test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
}

testMongoDB(); 