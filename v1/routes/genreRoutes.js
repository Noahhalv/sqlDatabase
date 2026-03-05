import express from 'express';
import {
    getAllGenres,
    getSingleGenre,
    createGenre, 
    updateGenre,
    deleteGenre
} from '../controllers/genreController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.get('/', getAllGenres);
router.get('/:id', getSingleGenre);
router.post('/', createGenre);
router.put('/:id', updateGenre);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteGenre);

export default router;