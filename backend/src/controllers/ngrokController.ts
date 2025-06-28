import { Request, Response } from 'express';
import { checkNgrokStatus, checkNgrokHealth } from '../utils/ngrokCheck';
import { getMonitoringStatus } from '../utils/ngrokMonitor';

export const getNgrokStatus = async (req: Request, res: Response) => {
  try {
    const isHealthy = await checkNgrokHealth();
    
    res.status(200).json({
      status: isHealthy ? 'running' : 'not_running',
      monitoring: getMonitoringStatus(),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[Ngrok Status Error]', error.message || error);
    res.status(500).json({ 
      error: 'Failed to check ngrok status',
      status: 'error'
    });
  }
};

export const getDetailedNgrokStatus = async (req: Request, res: Response) => {
  try {
    // Capture console output to get detailed status
    const originalLog = console.log;
    let capturedOutput = '';
    
    console.log = (...args) => {
      capturedOutput += args.join(' ') + '\n';
      originalLog(...args);
    };
    
    await checkNgrokStatus();
    
    // Restore original console.log
    console.log = originalLog;
    
    res.status(200).json({
      output: capturedOutput,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[Detailed Ngrok Status Error]', error.message || error);
    res.status(500).json({ 
      error: 'Failed to get detailed ngrok status',
      status: 'error'
    });
  }
}; 