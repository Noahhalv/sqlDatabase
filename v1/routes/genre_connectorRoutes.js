import express from 'express';
import {
    getAllGenreConnections,
    getSingleGenreConnection,
    createGenreConnection, 
    updateGenreConnection,
    deleteGenreConnection
} from '../controllers/genre_connectorController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.get('/', getAllGenreConnections);
router.get('/:id', getSingleGenreConnection);
router.post('/', createGenreConnection);
router.put('/:id', updateGenreConnection);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteGenreConnection);

export default router;