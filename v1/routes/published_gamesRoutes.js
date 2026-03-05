import express from 'express';
import {
    getAllPublishedGames,
    getSinglePublishedGame,
    createPublishedGame, 
    updatePublishedGame,
    deletePublishedGame
} from '../controllers/published_gamesController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.get('/', getAllPublishedGames);
router.get('/:id', getSinglePublishedGame);
router.post('/', createPublishedGame);
router.put('/:id', updatePublishedGame);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deletePublishedGame);

export default router;