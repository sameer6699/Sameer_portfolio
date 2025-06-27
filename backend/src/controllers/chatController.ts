import { Request, Response } from 'express';
import { callOpenAI } from '../services/chatService';

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format.' });
    }
    // Log the incoming user message(s) as JSON
    console.log(JSON.stringify({ event: 'incoming_user_message', messages }));
    const aiResponse = await callOpenAI(messages);
    res.status(200).json({ response: aiResponse });
  } catch (error: any) {
    // OpenAI-specific error logging
    console.error('[OpenAI Controller Error]', error.message || error);
    res.status(500).json({ error: error.message || 'Failed to get response from OpenAI.' });
  }
}; 