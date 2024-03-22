import { Router } from "express";
import User from "../Models/user.model.js";
const signupRouter=Router();
signupRouter.post("/",async(req,res)=>{
const { firstName, lastName, userName, email, password } = req.body.values;
  try{
  const user = new User({
    firstName,
    lastName,
    userName,
    email,
    password,
  });
  
  await user.save().then(() => {
    res.status(200).json({message:"User registered successfully"});
  });
  }catch(e)
  {
    res.status(400).json({message:"Username already exists please try different username"})
  }
})

export default signupRouter;