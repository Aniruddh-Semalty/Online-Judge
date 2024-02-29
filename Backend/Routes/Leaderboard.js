import {Router} from "express";
const leaderboardRouter=Router();
import User from "../Models/user.model.js";
leaderboardRouter.get("/",async(req,res)=>{
    const allUsers=await User.find({});
    res.status(200).json({users:allUsers});
})
export default leaderboardRouter;