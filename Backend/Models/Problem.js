import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv"
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

 const ProblemSchema=new Schema({
    Name:{type:String,required:true},
    Statement:{type:String,required:true},
    Difficulty:{type:String,required:true},
    Code:{type:String,required:true}
})

 const Problem=model("Problems",ProblemSchema);
export default Problem;