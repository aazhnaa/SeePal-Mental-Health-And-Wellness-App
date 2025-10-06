import cloudinary from 'cloudinary';
import Post from '../model/posts.model.js';

export const createPost = async (req,res)=>{
    try {
        const {text,image,title} = req.body;
        const posterId = req.user._id;

        if(!text) {
            return res.status(400).json({message: "Text is required"});
        }
        let imageUrl='';
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newPost = new Post({
            text,
            title,
            image:imageUrl,
            posterId
        })

        await newPost.save();
        //console.log("post created successfully")
        res.status(201).json("",newPost);
    } catch (error) {
        console.log("Error in createPost controller: ", error);
        return res.status(400).json({message: "Internal Server Error"});
    }
}
export const deletePost = async (req,res)=>{
    // to do later
    try {
        const {id:postId} = req.params;
        if(!postId) {
            return res.status(400).json({message:"Invalid post Id"})
        }
        const postToDelete = await Post.findByIdAndDelete(postId)
        if(!postToDelete) {
            return res.status(400).json({message:"Post not found"})            
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error in deletePost controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getAllPosts = async (req,res)=>{
    try {
        const myId = req.user._id;
        const posts = await Post.find({posterId:{$ne:myId}}).populate('posterId','username fullName profilePic').sort({ createdAt: -1 });
        //console.log("Sample populated post:", JSON.stringify(posts[0], null, 2));
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller: ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const getUserPost = async(req, res)=>{
    try {
        const {id:userId} = req.params;
        console.log(userId);
        const posts = await Post.find({posterId:userId}).populate('posterId','username fullName profilePic').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getUserPost controller: ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}