
import mongoose from "mongoose";
mongoose.connect('mongodb+srv://aniruddhsemalty627:abc123def@onlinejudge.omjronq.mongodb.net/');

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
})

 export const User = mongoose.model('Users', userSchema);




