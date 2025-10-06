import Mood from "../model/mood.model.js";
import User from "../model/user.model.js";

const normalizeDate = (date = new Date()) => {
  return new Date(new Date(date).setHours(0, 0, 0, 0));
};

export const addMood=async(req,res)=>{
    try {
        const userId = req.user._id
        let {mood} = req.body
        mood = mood?.trim()

        if (!['Excellent','Happy','Calm','Sad','Depressed'].includes(mood)) {
            return res.status(400).json({ error: "Invalid mood value." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const today = normalizeDate();
        const updatedMood = await Mood.findOneAndUpdate(
            {userId:userId, date:today},
            {mood},
            {upsert:true, new:true, setDefaultsOnInsert:true}
        )

        //streak logic :
        const lastLogDate = user.lastMoodLogDate ? normalizeDate(user.lastMoodLogDate) : null;
        const oneDay = 24 * 60 * 60 * 1000;

        if(!lastLogDate){
            user.currentStreak = 1;
        }
        else if (today.getTime() > lastLogDate.getTime()) {
            if (today.getTime() - lastLogDate.getTime() === oneDay) {
                user.currentStreak += 1;
            } else {
                user.currentStreak = 1;
            }
        }

        user.lastMoodLogDate = today;
        await user.save();

        res.status(200).json({
            message: "Mood updated successfully!",
            mood: updatedMood,
            currentStreak: user.currentStreak
        });

    } catch (error) {
        console.error("Error in addMood:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export const getMood=async(req, res) =>{
    try {
        const userId = req.user._id;
        const myMood = await Mood.find({userId:userId}).sort({date:1})
        res.status(200).json(myMood)
    } catch (error) {
        console.error("Error in getMood:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export const getTodayMood = async(req, res) =>{
    try {
        const userId = req.user._id;
        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
        const endOfDay = new Date();
        endOfDay.setHours(23,59,59,999);

        const todayMood = await Mood.findOne({
            userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });

        res.status(200).json(todayMood || "");

    } catch (error) {
        
    }
}

export default {addMood, getMood}