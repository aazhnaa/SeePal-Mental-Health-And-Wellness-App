import express from 'express'
import {protectRoute} from '../middleware/user.middleware.js'
import { getResponse } from '../controllers/ai.controller.js'
const router = express.Router()

router.post('/chat', getResponse);

export default router;