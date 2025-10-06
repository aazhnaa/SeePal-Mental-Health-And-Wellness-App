import Journal from "../model/journal.model.js";
import cloudinary from "../lib/cloudinary.js";

export const addJournalEntry = async(req, res) =>{
    const {text, image} = req.body;
    const userId = req.user._id;
    try {
        if(!text){
            return res.status(400).json({message:"text is required!"})
        }
        let imageUrl = '';
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newEntry = new Journal({
            text,
            image:imageUrl,
            userId
        })

        await newEntry.save();
        console.log("post created successfully");
        res.status(201).json(newEntry);
    } catch (error) {
        //console.log("Error in addJorunal controller: ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getEntries = async(req, res) =>{
    try {
        const {id:userId} = req.params;
        const entries = await Journal.find({userId:userId}).sort({createdAt:-1});
        return res.status(200).json(entries);
    } catch (error) {
        //console.log("error in getEntries controller : ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

