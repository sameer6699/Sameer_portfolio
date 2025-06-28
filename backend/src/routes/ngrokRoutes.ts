import { Router } from 'express';
import { getNgrokStatus, getDetailedNgrokStatus } from '../controllers/ngrokController';

const router = Router();

// Get basic ngrok status
router.get('/status', getNgrokStatus);

// Get detailed ngrok status with tunnel information
router.get('/status/detailed', getDetailedNgrokStatus);

export default router; 