import { checkNgrokHealth } from './ngrokCheck';

let isMonitoring = false;
let monitorInterval: NodeJS.Timeout | null = null;

export const startNgrokMonitoring = (intervalMinutes: number = 5): void => {
  if (isMonitoring) {
    console.log('⚠️  ngrok monitoring is already running');
    return;
  }

  isMonitoring = true;
  const intervalMs = intervalMinutes * 60 * 1000;

  console.log(`🔍 Starting ngrok monitoring (checking every ${intervalMinutes} minutes)`);

  monitorInterval = setInterval(async () => {
    const isHealthy = await checkNgrokHealth();
    
    if (!isHealthy) {
      console.log('⚠️  ngrok tunnel appears to be down or not accessible');
      console.log('   Check if ngrok is still running: http://localhost:4040');
    }
  }, intervalMs);
};

export const stopNgrokMonitoring = (): void => {
  if (monitorInterval) {
    clearInterval(monitorInterval);
    monitorInterval = null;
    isMonitoring = false;
    console.log('🔍 Stopped ngrok monitoring');
  }
};

export const getMonitoringStatus = (): boolean => {
  return isMonitoring;
}; 