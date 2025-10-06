import express from 'express';
import { addJournalEntry, getEntries } from '../controllers/journal.controller.js';
import { protectRoute } from '../middleware/user.middleware.js';
const router = express.Router();

router.post('/', protectRoute, addJournalEntry);
router.get('/:id', protectRoute, getEntries);

export default router;