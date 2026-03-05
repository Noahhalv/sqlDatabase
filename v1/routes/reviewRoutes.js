import express from 'express';
import {
    getAllReviews,
    getSingleReview,
    createReview,
    updateReview,
    deleteReview
} from '../controllers/reviewController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.get('/', getAllReviews);
router.get('/:id', getSingleReview);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteReview);

export default router;