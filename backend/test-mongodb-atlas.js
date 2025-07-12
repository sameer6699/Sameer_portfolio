const mongoose = require('mongoose');
require('dotenv').config();

async function testMongoDBConnection() {
  try {
    console.log('🔌 Testing MongoDB Atlas connection...');
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MONGO_URI not found in environment variables');
      return;
    }
    await mongoose.connect(mongoUri);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:', error.message);
  }
}

testMongoDBConnection(); 