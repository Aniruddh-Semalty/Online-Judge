import {Router} from "express";
const leaderboardRouter=Router();
import User from "../Models/user.model.js";
leaderboardRouter.get("/",async(req,res)=>{
    try{
    const allUsers=await User.find({});
    res.status(200).json({users:allUsers});
    }
    catch(e){
        console.log(e);
    }
})
export default leaderboardRouter;