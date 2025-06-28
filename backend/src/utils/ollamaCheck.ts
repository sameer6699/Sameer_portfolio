import axios from 'axios';

export async function checkOllamaOnStartup(): Promise<void> {
  const baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'llama2';
  
  console.log('🔍 Checking Ollama connection...');
  console.log(`   Base URL: ${baseURL}`);
  console.log(`   Default Model: ${model}`);
  
  try {
    // Check if Ollama is running
    const response = await axios.get(`${baseURL}/api/tags`, { timeout: 5000 });
    console.log('✅ Ollama is running and accessible');
    
    // Check if the default model is available
    const models = response.data.models || [];
    const modelExists = models.some((m: any) => m.name === model);
    
    if (modelExists) {
      console.log(`✅ Model '${model}' is available`);
    } else {
      console.log(`⚠️  Model '${model}' not found. Available models:`);
      models.forEach((m: any) => console.log(`   - ${m.name}`));
      console.log(`💡 To pull the model: ollama pull ${model}`);
    }
    
  } catch (error) {
    console.error('❌ Ollama is not accessible');
    console.error('   Make sure Ollama is running: ollama serve');
    console.error('   You can still start the server, but chat functionality will not work');
  }
  
  console.log('');
} 