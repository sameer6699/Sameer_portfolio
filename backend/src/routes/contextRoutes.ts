import { Router } from 'express';
import { 
  getAvailableContexts, 
  getContextById, 
  getDefaultContextInfo 
} from '../controllers/contextController';

const router = Router();

router.get('/', getAvailableContexts);
router.get('/default', getDefaultContextInfo);
router.get('/:contextId', getContextById);

export default router; 