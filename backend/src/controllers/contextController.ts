import { Request, Response } from 'express';
import { getAllContexts, getContext, getDefaultContext } from '../config/aiContexts';
import { connectDB } from '../db';
import { GeminiService } from '../services/geminiService';

const geminiService = new GeminiService();

export const getAvailableContexts = async (req: Request, res: Response) => {
  try {
    const contexts = getAllContexts();
    res.status(200).json({ 
      contexts,
      defaultContext: getDefaultContext().id
    });
  } catch (error: any) {
    console.error('[Context Controller Error]', error.message || error);
    res.status(500).json({ error: 'Failed to fetch available contexts' });
  }
};

export const getContextById = async (req: Request, res: Response) => {
  try {
    const { contextId } = req.params;
    const context = getContext(contextId);
    
    if (context) {
      res.status(200).json({ context });
    } else {
      res.status(404).json({ error: 'Context not found' });
    }
  } catch (error: any) {
    console.error('[Context Controller Error]', error.message || error);
    res.status(500).json({ error: 'Failed to fetch context' });
  }
};

export const getDefaultContextInfo = async (req: Request, res: Response) => {
  try {
    const defaultContext = getDefaultContext();
    res.status(200).json({ context: defaultContext });
  } catch (error: any) {
    console.error('[Context Controller Error]', error.message || error);
    res.status(500).json({ error: 'Failed to fetch default context' });
  }
};

export const checkGeminiHealth = async (req: Request, res: Response) => {
  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'unknown',
        gemini: 'unknown',
        server: 'healthy'
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
        geminiModel: process.env.GEMINI_MODEL || 'gemini-1.5-flash'
      }
    };

    // Check database connection
    try {
      await connectDB();
      healthStatus.services.database = 'healthy';
    } catch (dbError: any) {
      healthStatus.services.database = 'unhealthy';
      healthStatus.status = 'degraded';
      console.error('[Health Check] Database connection failed:', dbError.message);
    }

    // Check Gemini API
    try {
      const testResult = await geminiService.generateChatCompletion([
        { role: 'user', content: 'Hello' }
      ]);
      if (testResult.response && testResult.response.trim().length > 0) {
        healthStatus.services.gemini = 'healthy';
      } else {
        healthStatus.services.gemini = 'unhealthy';
        healthStatus.status = 'degraded';
      }
    } catch (geminiError: any) {
      healthStatus.services.gemini = 'unhealthy';
      healthStatus.status = 'degraded';
      console.error('[Health Check] Gemini API failed:', geminiError.message);
    }

    // Determine overall status
    const unhealthyServices = Object.values(healthStatus.services).filter(
      status => status === 'unhealthy'
    ).length;

    if (unhealthyServices === 0) {
      healthStatus.status = 'healthy';
      res.status(200).json(healthStatus);
    } else if (unhealthyServices < Object.keys(healthStatus.services).length) {
      healthStatus.status = 'degraded';
      res.status(200).json(healthStatus);
    } else {
      healthStatus.status = 'unhealthy';
      res.status(503).json(healthStatus);
    }

  } catch (error: any) {
    console.error('[Health Check Error]', error.message || error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message || 'Health check failed',
      services: {
        database: 'unknown',
        gemini: 'unknown',
        server: 'unhealthy'
      }
    });
  }
}; 