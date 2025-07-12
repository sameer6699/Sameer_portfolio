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
    
    console.log('📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    
    // Test creating a collection
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ 
      test: 'connection', 
      timestamp: new Date() 
    });
    console.log('✅ Successfully wrote to database!');
    
    // Clean up test data
    await testCollection.deleteOne({ test: 'connection' });
    console.log('🧹 Cleaned up test data');
    
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas');
  }
}

testMongoDBConnection(); 