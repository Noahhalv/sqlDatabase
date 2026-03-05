import express from 'express';
import {
    getAllDevelopedGames,
    getSingleDevelopedGame,
    createDevelopedGame,
    updateDevelopedGame,
    deleteDevelopedGame
} from '../controllers/developer_connectorController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.get('/', getAllDevelopedGames);
router.get('/:id', getSingleDevelopedGame);
router.post('/', createDevelopedGame);
router.put('/:id', updateDevelopedGame);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteDevelopedGame);

export default router;