import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    DOB:Date,
    Fullname:String
})

 export const User = mongoose.model('Users', userSchema);