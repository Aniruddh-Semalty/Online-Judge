import dotenv from "dotenv";
import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const userSchema = new Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      index: true,
    },

    problemsSolved:[{
      type:Schema.Types.ObjectId,
      ref:"Problem",
      required:true,
      
    }],
    isAdmin:{
      type:Boolean,
      required:true,
      default:false,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if(!this.isModified("password"))
  return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//check input password with stored password  
userSchema.methods.isPasswordCorrect=async function(password){
  return await bcrypt.compare(password,this.password);
}

const User = mongoose.model("User", userSchema);
export default User;
