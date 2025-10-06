import express from 'express'
import { addMood, getMood, getTodayMood } from '../controllers/mood.controller.js'
import {protectRoute} from '../middleware/user.middleware.js'
const router = express.Router()

router.post("/", protectRoute, addMood);
router.get("/",protectRoute,getMood);
router.get("/today", protectRoute, getTodayMood)

export default router