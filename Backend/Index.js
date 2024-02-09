import express from "express";

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
import User from "./Models/User.js";


app.post("/login", async (req, res) => {
  const { username, password } = req.body.data;
  console.log(username, password);
  const response = await User.find({ userName: username, password: password });
  console.log(response);
  if (response.length === 0) {
    res
      .status(400)
      .json({ message: "Invalid User!Please check your email and password" });
  } else {
    res.status(200).json({ message: " logged in successfully" });
  }
});


app.post("/signup", async (req, res) => {
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
});


//problems router
app.get("/problems",async(req,res)=>{
    
});



app.listen(PORT, () => {
  console.log("App is running ");
});
