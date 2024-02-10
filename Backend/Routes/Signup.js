import { Router } from "express";
import User from "../Models/User.js";
const signupRouter=Router();
signupRouter.post("/",async(req,res)=>{
const { firstName, lastName, userName, email, password } = req.body.values;

  const user = new User({
    firstName,
    lastName,
    userName,
    email,
    password,
  });
  console.log(user);
  await user.save().then(() => {
    res.send("User registered successfully");
  });
})

export default signupRouter;