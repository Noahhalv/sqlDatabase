import express from 'express';
import {
    getAllGames,
    getSingleGame,
    createGame, 
    updateGame,
    deleteGame
} from '../controllers/gameController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.get('/', getAllGames);
router.get('/:id', getSingleGame);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteGame);

export default router;