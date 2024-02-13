import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const ProblemSchema = new Schema({
  Name: { type: String, required: true },
  Statement: { type: String, required: true },
  Difficulty: { type: String, required: true },
  Code: { type: String, required: true },
},{
  timestamps:true,
});

const Problem = model("Problem", ProblemSchema);
export default Problem;
