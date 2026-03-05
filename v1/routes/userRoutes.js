import express from 'express';
import {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteUser);

export default router;