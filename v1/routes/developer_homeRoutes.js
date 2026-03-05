import express from 'express';
import {
    getAllDevelopers,
    getSingleDeveloper,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper
} from '../controllers/developer_homeController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.get('/', getAllDevelopers);
router.get('/:id', getSingleDeveloper);
router.post('/', createDeveloper);
router.put('/:id', updateDeveloper);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteDeveloper);

export default router;