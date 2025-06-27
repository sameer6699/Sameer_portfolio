import { Request, Response } from 'express';
import { processContact } from '../services/contactService';

export const handleContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    await processContact({ name, email, message });
    res.status(200).json({ message: 'Contact form submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form.' });
  }
}; 