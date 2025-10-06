import User from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import {generateToken} from '../lib/token.js'
import cloudinary from '../lib/cloudinary.js'
import multer from 'multer'

const storage = multer.memoryStorage();
export const upload = multer({
    storage:storage,
    limits:{fileSize:5*1024*1024},
    fileFilter:(req,file,cb) =>{
        if(file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf'){
            cb(null, true);
        }
        else{
            cb(new Error('Invalid file type. Only images and PDFs are allowed.'),false);
        }
    }
})


export const signup=async(req,res)=>{
    const {email,password, username} = req.body;
    try {
        if(!email || !password || !username){
            return res.status(400).json({message:"all fields must be filled!"})
        }  
        if(password.length < 6){
            return res.status(400).json({message : "Password must be of at least 6 characters"})
        }
        const user = await User.findOne({$or: [{email},{username}]})      
        if(user){
            return res.status(400).json({message:"This user already exists!"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)
        const newUser = new User({
            email,
            username,
            password : hashPass
        })

        if(newUser){
            generateToken(newUser._id, newUser.role, res)
            await newUser.save()
             res.status(201).json({
                _id : newUser._id,
                username:newUser.username,
                email:newUser.email,
                age:newUser.age,
                profilePic : newUser.profilePic
            })
        }
        else{
            res.status(400).json({message:"invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller : ", error.message)
        res.status(400).json({message:"internal server error"})
    }
}
export const signupTherapist=async(req,res)=>{
    const {email,password, username, licenseNumber, licenseDocument, therapyTypes} = req.body;
    try {
        if(!email || !password || !username || !licenseNumber || !licenseDocument || therapyTypes.length===0){
            return res.status(400).json({message:"all fields must be filled!"})
        }  
        if(password.length < 6){
            return res.status(400).json({message : "Password must be of at least 6 characters"})
        }
        const user = await User.findOne({$or: [{email},{username}]})      
        if(user){
            return res.status(400).json({message:"This user already exists!"})
        }
        const uploadResponse = await cloudinary.uploader.upload(licenseDocument, {
            resource_type: 'auto',
            folder: 'therapist_licenses', 
        });
        
        if (!uploadResponse || !uploadResponse.secure_url) {
            throw new Error('Cloudinary upload failed. Please try again.');
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            role: 'therapist',
            licenseNumber,
            licenseDocumentURL: uploadResponse.secure_url,
            verified: false, 
            therapyTypes
        });

        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, newUser.role, res);
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                licenseDocumentURL: newUser.licenseDocumentURL,
            });
        } else {
             res.status(400).json({ error: "Invalid user data received." });
        }
    } catch (error) {
        console.log("Error in signup controller : ", error.message)
        res.status(400).json({message:"internal server error"})
    }
}
export const login=async(req,res)=>{
    //console.log("Login request body:", req.body);
    const {identifier,password} = req.body;
    try {
        if(!identifier || !password){
            return res.status(400).json({message:"all fields must be filled!"})
        }
        const user = await User.findOne({$or:[{email:identifier},{username:identifier}]})
        //const user = await User.findOne({username : identifier})
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const isPassCorrect = await bcrypt.compare(password,user.password)
        if(!isPassCorrect){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        generateToken(user._id, user.role, res)
        res.status(200).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller : ", error.message)
        res.status(400).json({message:"internal server error"})
    }
}
export const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out Successfuuly"})
    } catch (error) {
        console.log("Error in logout controller :", error)
        res.status(400).json({message:"Internal server error"})
    }
}
export const checkAuth =(req,res)=>{
     try {
        //console.log("user's id in controller : ", req.user._id);
        res.status(200).json(req.user)
     } catch (error) {
        console.log("error in checkAuth controller ", error.message)
        res.status(500).json({message:"internal server error"})
     }
}
export const updateProfile=async(req,res)=>{
    const{profilePic,fullName,age,description,gender} = req.body
    try {
        const userId = req.user._id
        const updatedData = {
          ...(fullName && { fullName }),
          ...(age && { age }),
          ...(description && { description }),
          ...(gender && { gender }),
        };
        if(profilePic){
            const uploadResponse = await cloudinary.uploader.upload(profilePic)
            updatedData.profilePic = uploadResponse.secure_url            
        }
        const updatedUser = await User.findOneAndUpdate({_id : userId},updatedData,{new:true}).select("-password")
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile controller : ",error)
        res.status(500).json({message:"internal server error"})
    }
}
export const getFollowers = async(req,res)=>{
    try {
        const {id:userId} = req.params
        const followers = await User.findById(userId).select("followers")
        return res.status(200).json(followers.followers)
    } catch (error) {
        
    }
}
export const getFollowings = async(req,res)=>{
    try {
        const {id:userId} = req.params
        const followings  = await User.findById(userId).select("following")
        return res.status(200).json(followings.following)
    } catch (error) {
        
    }
}
export const followUser = async(req, res)=>{
    try {
        const {id:userId} = req.params
        const myId = req.user._id

        const authUser = await User.findById(myId)
        const toFollowUser = await User.findById(userId)

        if(!toFollowUser) {
            return res.status(404).json({message:'user not found'})
        }
        if (toFollowUser.followers.includes(myId)) {
      return res.status(400).json({ message: "Already following this user." });
        }

        toFollowUser.followers.push(myId)
        authUser.following.push(userId)

        await toFollowUser.save();
        await authUser.save();

        res.status(200).json({message:'Followed successfully'})
    } catch (error) {
        console.error("Error in followUser:", error);
        res.status(500).json({ message: "Server error." });
    }
}
export const getUserByUsername = async(req, res)=>{
    try {
        const {query} = req.query;
        const currentUserId = req.user._id
        if(!query){
            res.status(400).json({ message: "Search query is required" });
        }
        const user = await User.find({
            username:{$regex :  `^${query}`,  $options: 'i'},
            _id:{$ne:currentUserId}
        }).select("_id username profilePic fullName")
        res.status(200).json(user)
    } catch (error) {
        console.error("Error in searchUsersByUsernamePrefix:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getUserById = async(req,res)=>{
    const {id} = req.params
    try{
        const user = await User.findById(id).select("-password")
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        res.status(200).json(user)
    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
  }
}
export const getTherapists = async(req, res) =>{
    try {
        const therapists = await User.find({role:"therapist"})
        return res.status(200).json(therapists);
    } catch (error) {
        console.log("error in getTherapist controller : ", error);
        return res.status(500).json({message:"internal server error"});
    }
}
