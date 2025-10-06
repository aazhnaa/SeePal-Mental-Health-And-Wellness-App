import express from 'express';
import {createPost, getAllPosts, getUserPost, deletePost}from '../controllers/post.controller.js';
import {protectRoute} from '../middleware/user.middleware.js';
const router = express.Router();
router.post('/create', protectRoute, createPost);
router.get('/allPosts', protectRoute, getAllPosts);
router.get('/:id', protectRoute, getUserPost);
router.delete('/:id', protectRoute, deletePost);
export default router;