import { Router } from 'express';
import { 
  handleChat, 
  clearSession, 
  getSessionContext, 
  getChatHistoryController, 
  clearChatHistoryController 
} from '../controllers/chatController';
import { getOllamaModels, checkOllamaHealth, handleStreamingChat } from '../controllers/ollamaController';

const router = Router();

router.post('/', handleChat);
router.post('/stream', handleStreamingChat);
router.get('/models', getOllamaModels);
router.get('/health', checkOllamaHealth);
router.delete('/session/:sessionId', clearSession);
router.get('/session/:sessionId', getSessionContext);

// New routes for chat history management
router.get('/history/:sessionId', getChatHistoryController);
router.delete('/history/:sessionId', clearChatHistoryController);

export default router; 