const { spawn } = require('child_process');
const ngrok = require('ngrok');
const fs = require('fs');
const http = require('http');

const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 5173;

function waitForServer(port, maxAttempts = 30) {
  return new Promise((resolve) => {
    let attempts = 0;
    
    const checkServer = () => {
      attempts++;
      const req = http.get(`http://localhost:${port}`, (res) => {
        resolve(true);
      });
      
      req.on('error', () => {
        if (attempts >= maxAttempts) {
          resolve(false);
        } else {
          setTimeout(checkServer, 1000);
        }
      });
      
      req.setTimeout(1000, () => {
        req.destroy();
        if (attempts >= maxAttempts) {
          resolve(false);
        } else {
          setTimeout(checkServer, 1000);
        }
      });
    };
    
    checkServer();
  });
}

async function startLiveServer() {
  console.log('🚀 Starting Live Chat Server...\n');

  let backendProcess, frontendProcess;

  try {
    // Start backend server
    console.log('📡 Starting Backend Server...');
    backendProcess = spawn('npm', ['run', 'dev'], {
      cwd: './backend',
      stdio: 'pipe',
      shell: true
    });

    backendProcess.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output) console.log(`📡 Backend: ${output}`);
    });

    backendProcess.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output) console.log(`📡 Backend Error: ${output}`);
    });

    // Wait for backend to be ready
    console.log('⏳ Waiting for backend server to start...');
    const backendReady = await waitForServer(BACKEND_PORT);
    
    if (!backendReady) {
      throw new Error('Backend server failed to start');
    }

    console.log('✅ Backend server is ready!');

    // Start ngrok tunnel for backend
    console.log('🌐 Starting ngrok tunnel for backend...');
    const backendUrl = await ngrok.connect({
      addr: BACKEND_PORT,
      authtoken: process.env.NGROK_AUTH_TOKEN
    });
    
    console.log(`✅ Backend ngrok URL: ${backendUrl}`);
    console.log(`📡 Backend API available at: ${backendUrl}/api/chat`);

    // Create environment file for frontend with backend URL
    const envContent = `VITE_BACKEND_URL=${backendUrl}`;
    fs.writeFileSync('.env.local', envContent);
    console.log('📝 Created .env.local with backend URL');

    // Start frontend server
    console.log('\n🎨 Starting Frontend Server...');
    frontendProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });

    frontendProcess.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output) console.log(`🎨 Frontend: ${output}`);
    });

    frontendProcess.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output) console.log(`🎨 Frontend Error: ${output}`);
    });

    // Wait for frontend to be ready
    console.log('⏳ Waiting for frontend server to start...');
    const frontendReady = await waitForServer(FRONTEND_PORT);
    
    if (!frontendReady) {
      throw new Error('Frontend server failed to start');
    }

    console.log('✅ Frontend server is ready!');

    // Start ngrok tunnel for frontend
    console.log('🌐 Starting ngrok tunnel for frontend...');
    const frontendUrl = await ngrok.connect({
      addr: FRONTEND_PORT,
      authtoken: process.env.NGROK_AUTH_TOKEN
    });
    
    console.log(`✅ Frontend ngrok URL: ${frontendUrl}`);
    console.log(`🎨 Your portfolio is now live at: ${frontendUrl}`);

    console.log('\n🎉 Live Chat Server is running!');
    console.log('📱 Share these URLs:');
    console.log(`   Frontend: ${frontendUrl}`);
    console.log(`   Backend API: ${backendUrl}/api/chat`);
    console.log('\n💡 To stop the servers, press Ctrl+C');

    // Handle process termination
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down servers...');
      if (backendProcess) backendProcess.kill();
      if (frontendProcess) frontendProcess.kill();
      await ngrok.kill();
      process.exit(0);
    });

    // Handle process errors
    process.on('uncaughtException', async (error) => {
      console.error('❌ Uncaught Exception:', error);
      if (backendProcess) backendProcess.kill();
      if (frontendProcess) frontendProcess.kill();
      await ngrok.kill();
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Error starting live server:', error);
    if (backendProcess) backendProcess.kill();
    if (frontendProcess) frontendProcess.kill();
    await ngrok.kill();
    process.exit(1);
  }
}

startLiveServer().catch(console.error); 