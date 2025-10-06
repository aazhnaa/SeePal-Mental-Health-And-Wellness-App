import express from 'express'
import { signup , login, logout, updateProfile, checkAuth, getFollowers, getFollowings, followUser,getUserByUsername, getUserById, signupTherapist, getTherapists} from '../controllers/user.controller.js'
import {protectRoute} from '../middleware/user.middleware.js'
import { verifyAdmin } from '../middleware/verifyAdmin.middleware.js'
const router = express.Router()

router.post("/signup",signup)
router.post("/signup/therapist",signupTherapist)
router.post("/login",login)
router.post("/logout",logout)
router.put("/updateProfile",protectRoute,updateProfile)
router.get("/check",protectRoute,checkAuth)
router.get("/followers/:id", protectRoute, getFollowers)
router.get("/followings/:id", protectRoute, getFollowings)
router.post("/:id/follow", protectRoute, followUser)
router.get('/search',protectRoute,getUserByUsername)
router.get('/search/:id', protectRoute, getUserById)
router.get('/therapists', getTherapists)
router.get('/admin-dashboard', verifyAdmin, (req, res) => {
  res.send('Welcome, admin!');
});


export default router