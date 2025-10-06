import mongoose from "mongoose";
const journalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text : {
        type: String,
        required: true
    },
    image:{
        type:String,
        default:""
    }
},
{
    timestamps:true
});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;