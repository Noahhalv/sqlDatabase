import express from 'express';
import {
    getAllPublishers,
    getSinglePublisher,
    createPublisher,
    updatePublisher,
    deletePublisher
} from '../controllers/publisher_homeController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.get('/', getAllPublishers);
router.get('/:id', getSinglePublisher);
router.post('/', createPublisher);
router.put('/:id', updatePublisher);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deletePublisher);

export default router;