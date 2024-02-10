import { Router } from "express";
import User from "../Models/User.js";
const loginRouter=Router();
loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body.data;
    console.log(username, password);
    const response = await User.find({ userName: username, password: password });
    
    if (response.length === 0) {
      res
        .status(400)
        .json({ message: "Invalid User!Please check your email and password" });
    } else {
      res.status(200).json({ message: " logged in successfully" });
    }
  });

  export default loginRouter;