import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    mood:{
        type:String,
        enum:['Excellent','Happy','Calm','Sad','Depressed']
    },
    date:{
        type:Date,
        required:true,
        default:()=>new Date().setHours(0,0,0,0)
    }

},{timestamps:true})

moodSchema.index({ userId: 1, date: 1 }, { unique: true });

const Mood = mongoose.model('Mood',moodSchema)
export default Mood