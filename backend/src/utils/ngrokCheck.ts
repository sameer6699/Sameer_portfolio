import axios from 'axios';

interface NgrokTunnel {
  name: string;
  uri: string;
  public_url: string;
  proto: string;
  config: {
    addr: string;
  };
}

interface NgrokStatus {
  tunnels: NgrokTunnel[];
  version: string;
}

export const checkNgrokStatus = async (): Promise<void> => {
  try {
    // Check if ngrok is running by trying to access its API
    const response = await axios.get('http://localhost:4040/api/tunnels', {
      timeout: 3000
    });
    
    const data: NgrokStatus = response.data;
    
    if (data.tunnels && data.tunnels.length > 0) {
      console.log('\n🌐 ngrok Tunnels Status:');
      console.log('✅ ngrok is running and tunnels are active!');
      
      data.tunnels.forEach((tunnel, index) => {
        console.log(`   ${index + 1}. ${tunnel.name || 'unnamed'}`);
        console.log(`      Public URL: ${tunnel.public_url}`);
        console.log(`      Protocol: ${tunnel.proto}`);
        console.log(`      Local Address: ${tunnel.config.addr}`);
        console.log('');
      });
      
      // Check if any tunnel is for our backend port
      const backendPort = process.env.PORT || 5000;
      const backendTunnel = data.tunnels.find(tunnel => 
        tunnel.config.addr.includes(`:${backendPort}`)
      );
      
      if (backendTunnel) {
        console.log('🎯 Backend API is accessible via ngrok!');
        console.log(`   API URL: ${backendTunnel.public_url}/api`);
        console.log(`   Chat endpoint: ${backendTunnel.public_url}/api/chat`);
        console.log(`   Health check: ${backendTunnel.public_url}/api/chat/health`);
      } else {
        console.log('⚠️  No ngrok tunnel found for backend port', backendPort);
        console.log('   To create a tunnel, run: ngrok http', backendPort);
      }
      
    } else {
      console.log('\n🌐 ngrok Status:');
      console.log('⚠️  ngrok is running but no tunnels are active');
      console.log('   To create a tunnel, run: ngrok http', process.env.PORT || 5000);
    }
    
  } catch (error) {
    console.log('\n🌐 ngrok Status:');
    console.log('❌ ngrok is not running or not accessible');
    console.log('   To start ngrok, run: ngrok http', process.env.PORT || 5000);
    console.log('   Or use the live script: npm run live (from project root)');
  }
};

export const checkNgrokHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get('http://localhost:4040/api/tunnels', {
      timeout: 2000
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}; 