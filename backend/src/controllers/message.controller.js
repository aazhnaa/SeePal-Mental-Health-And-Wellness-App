import mongoose from 'mongoose';
import Message from '../model/message.model.js';
import User from '../model/user.model.js';
import cloudinary from '../lib/cloudinary.js'
import {getReceiverSocketId} from '../lib/socket.js'

export const getAllUsers= async(req,res)=>{
    //all users except ourselves
   try {
     const authUserId = req.user._id
     const filteredUsers = await User.find({_id:{$ne:authUserId}}).select("-password")
     res.status(200).json(filteredUsers)
   } catch (error) {
    //console.log("Error in getAllUsers controller : ",error)
    res.status(500).json({error:"Internal Server Error"})
   }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:receiverId}= req.params
        const senderId = req.user._id


        //convert to objectID!!! :
        // const senderObjectId = mongoose.Types.ObjectId.createFromHexString(senderId.toString());
        // const receiverObjectId = mongoose.Types.ObjectId.createFromHexString(receiverId.toString());


        // const messages = await Message.find({
        //   $or: [
        //     { senderId: receiverObjectId, receiverId: senderObjectId },
        //     { senderId: senderObjectId, receiverId: receiverObjectId },
        //   ],
        // });

        const messages = await Message.find({
          $or: [
            { senderId: receiverId, receiverId: senderId },
            { senderId: senderId, receiverId: receiverId },
          ],
        });


        res.status(200).json(messages)
    } catch (error) {
        //console.log("Error in getMessages controller : ",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const sendMessages = async(req,res)=>{
    try {
        const {id:receiverId}=req.params
        const {text, image} = req.body
        const senderId = req.user._id

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save()

        //sending messages in real-time to the receiver
        const receiverSocketId = getReceiverSocketId(receiverId)

        //if user is online :
        if(receiverSocketId){
            //send it to only receiver
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        return res.status(201).json(newMessage)
    } catch (error) {
        //console.log("Error in getMessages controller : ",error)
        res.status(500).json({error:"Internal Server Error"})
    }
}