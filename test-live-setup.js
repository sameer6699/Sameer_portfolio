const fs = require('fs');

console.log('🧪 Testing Live Chat Setup...\n');

// Check if required files exist
const requiredFiles = [
  'start-live.js',
  'package.json',
  'backend/package.json',
  'backend/src/models/chatModel.ts',
  'backend/src/services/chatService.ts',
  'backend/src/controllers/chatController.ts',
  'backend/src/routes/chatRoutes.ts',
  'src/components/Footer.tsx'
];

console.log('📁 Checking required files:');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Check if ngrok is installed
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasNgrok = packageJson.devDependencies && packageJson.devDependencies.ngrok;
console.log(`\n📦 ngrok installed: ${hasNgrok ? '✅' : '❌'}`);

// Check if live script exists
const hasLiveScript = packageJson.scripts && packageJson.scripts.live;
console.log(`📜 Live script available: ${hasLiveScript ? '✅' : '❌'}`);

// Check backend dependencies
const backendPackageJson = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
const hasMongoose = backendPackageJson.dependencies && backendPackageJson.dependencies.mongoose;
console.log(`🗄️ MongoDB (mongoose) installed: ${hasMongoose ? '✅' : '❌'}`);

console.log('\n🎯 Setup Summary:');
console.log(`   Files: ${allFilesExist ? '✅ Complete' : '❌ Missing files'}`);
console.log(`   ngrok: ${hasNgrok ? '✅ Installed' : '❌ Not installed'}`);
console.log(`   Script: ${hasLiveScript ? '✅ Available' : '❌ Missing'}`);
console.log(`   MongoDB: ${hasMongoose ? '✅ Ready' : '❌ Not ready'}`);

if (allFilesExist && hasNgrok && hasLiveScript && hasMongoose) {
  console.log('\n🎉 Live Chat Setup is ready!');
  console.log('\n📋 Next Steps:');
  console.log('   1. Copy env-example.txt to .env');
  console.log('   2. Add your ngrok auth token to .env');
  console.log('   3. Start MongoDB: mongod');
  console.log('   4. Start Ollama: ollama serve');
  console.log('   5. Run: npm run live');
} else {
  console.log('\n❌ Setup incomplete. Please fix the issues above.');
} 