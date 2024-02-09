import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  userName: { type: String, required: true },
  email: {type:String,required:true},
  password: {type:String,required:true},
  
  
});

 const User = mongoose.model("Users", userSchema);
export default User;