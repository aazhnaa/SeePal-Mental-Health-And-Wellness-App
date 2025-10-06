import mongoose from "mongoose";

const therapyOptions = [
  "Individual Therapy",
  "Relationship Therapy",
  "Family Therapy",
  "Child & Adolescent Therapy",
  "Trauma & PTSD Therapy",
  "Addiction & Recovery Therapy",
  "Grief & Loss Therapy",
  "Career / Work Stress Counseling",
  "Group Therapy / Support Groups"
];

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['client', 'therapist', 'admin'],
        default:'client',
        required: true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    fullName:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    licenseNumber: {
        type: String,
        required: function () { return this.role === 'therapist'; },
    },
    licenseDocumentURL: {
        type: String,
        required: function () { return this.role === 'therapist'; },
    },
     verified: {
        type: Boolean,
        default: function() {
            if (this.role === 'therapist') {
                return false; 
            }
            return undefined; 
        }
    },
    qualifications: [String],
    specialties: [String],
    experienceYears: Number,
    therapyTypes:{
        type:[String],
        enum:therapyOptions,
        validate:{
            validator: function(arr){
                if(this.role==='therapist'){
                    return Array.isArray(arr) && arr.length > 0;
                }
                return true;
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    profilePic:{
        type:String,
        default:"",
    },
    description:{
        type:String,
        default:"",
        maxlength:150
    },
    age:{
        type:Number,
        default:"",
        min: 0, 
        max: 120
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        default: 0,
        min: 0
    }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    gender:{
        type:String,
        default:""
    },
    currentStreak:{
        type:Number,
        default:0
    },
    lastMoodLogDate: {
        type: Date,
    },
},
    {timestamps:true}
)

const User = mongoose.model("User",userSchema)
export default User
