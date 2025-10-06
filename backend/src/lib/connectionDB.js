import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//console.log(process.env.MONGODB_URI);
export const connectDB = async() =>{
   try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDb");
   } catch (error) {
    console.log('error in connectionDB.js : ',error)
   }
}