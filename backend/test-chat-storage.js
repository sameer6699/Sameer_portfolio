const mongoose = require('mongoose');
require('dotenv').config();

// Import the Chat model
const { Chat } = require('./dist/models/chatModel');

async function testChatStorage() {
  try {
    console.log('🔌 Testing MongoDB Atlas connection...');
    
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MONGO_URI not found in environment variables');
      return;
    }
    
    console.log('📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    
    // Test creating a chat entry
    const testChat = new Chat({
      sessionId: 'test-session-123',
      userMessage: 'Hello SAM AI!',
      aiResponse: 'Hi there! I\'m SAM AI, Sameer\'s personal assistant. How can I help you today?',
      timestamp: new Date(),
      context: { language: 'english' }
    });
    
    await testChat.save();
    console.log('✅ Successfully saved chat to sam_ai_chat collection!');
    console.log('📝 Chat ID:', testChat._id);
    
    // Test retrieving chat history
    const chatHistory = await Chat.find({ sessionId: 'test-session-123' }).sort({ timestamp: -1 });
    console.log('📚 Retrieved chat history:', chatHistory.length, 'messages');
    
    // Clean up test data
    await Chat.deleteOne({ _id: testChat._id });
    console.log('🧹 Cleaned up test chat data');
    
    // Show collection info
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Chat storage test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas');
  }
}

testChatStorage(); 