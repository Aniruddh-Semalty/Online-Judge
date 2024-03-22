import { Router } from "express";
import User from "../Models/user.model.js";
import createSecretJwtToken from "../utils/secretToken.js";

const loginRouter = Router();
loginRouter.post("/", async (req, res) => {

  const { userName, password } = req.body.values;

  const isUserExist = await User.findOne({ userName: userName });

  if (isUserExist) {
    const isPasswordCorrect = await isUserExist.isPasswordCorrect(password);
    if (isPasswordCorrect) {
      const token = await createSecretJwtToken(
        isUserExist._id,
        isUserExist.userName,
        isUserExist.isAdmin,
      );
     
      
        const isAdmin=isUserExist.isAdmin;
      return res
        .status(200)
        .json({ userName,isAdmin, message: "logged in successfully" ,token});
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
