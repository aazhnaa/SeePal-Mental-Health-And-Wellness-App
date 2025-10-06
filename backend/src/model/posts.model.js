import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    posterId:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text:{
        type:String,
        required: true,
    },
    title:{
        type:String,
    },
    image:{
        type: String,
    },
    likedBy:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        },
    ],
},{ timestamps:true})

const Post = mongoose.model('Post',postSchema);
export default Post;