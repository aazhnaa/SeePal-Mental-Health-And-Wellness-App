import express from 'express'
import { protectRoute } from '../middleware/user.middleware.js';
import { getAllUsers, getMessages, sendMessages } from '../controllers/message.controller.js';
const router = express.Router();

router.get('/users',protectRoute, getAllUsers);
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessages)

export default router