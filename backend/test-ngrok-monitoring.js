const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testNgrokMonitoring() {
  console.log('🧪 Testing ngrok Monitoring...\n');

  try {
    // Test basic ngrok status
    console.log('1. Testing basic ngrok status...');
    const statusResponse = await axios.get(`${BASE_URL}/api/ngrok/status`);
    console.log('✅ Basic status:', statusResponse.data);

    // Test detailed ngrok status
    console.log('\n2. Testing detailed ngrok status...');
    const detailedResponse = await axios.get(`${BASE_URL}/api/ngrok/status/detailed`);
    console.log('✅ Detailed status output:');
    console.log(detailedResponse.data.output);

    // Test health check
    console.log('\n3. Testing server health...');
    const healthResponse = await axios.get(`${BASE_URL}/api/chat/health`);
    console.log('✅ Server health:', healthResponse.data);

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Backend server is not running');
      console.log('   Start it with: npm run dev');
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

// Run the test
testNgrokMonitoring(); 