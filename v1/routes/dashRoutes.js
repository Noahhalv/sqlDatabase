import express from 'express';
import { adminDashboard } from '../controllers/dashController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/admin', authenticateToken, authorizeRole('admin'), adminDashboard);

export default router;