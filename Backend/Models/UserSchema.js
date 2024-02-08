import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: {type:String,required:true},
  email: {type:String,required:true},
  fullName: {type:String,required:true}
});

 const User = mongoose.model("Users", userSchema);
export default User;