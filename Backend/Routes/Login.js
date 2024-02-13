import { Router } from "express";
import User from "../Models/user.model.js";
const loginRouter = Router();
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body.data;

  const isUserExist = await User.findOne({ userName: username });

  if (isUserExist) {
    const isPasswordCorrect = await isUserExist.isPasswordCorrect(password);
    if (isPasswordCorrect) {
      return res
        .status(200)
        .json({ username, message: "logged in successfully" });
    } else {
      res.status(400).json({ message: "Please check your password" });
    }
  } else {
    res
      .status(401)
      .json({ message: "Invalid user please check your username or password" });
  }
});

export default loginRouter;
