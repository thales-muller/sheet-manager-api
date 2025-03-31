import { Router } from 'express';
import { login } from '../controllers/authController.js';

const router = Router();

// Endpoint for user login
router.post('/login', login);

export default router;
