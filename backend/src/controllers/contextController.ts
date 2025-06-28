import { Request, Response } from 'express';
import { getAllContexts, getContext, getDefaultContext } from '../config/aiContexts';

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