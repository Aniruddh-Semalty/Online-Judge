import {Router} from "express";
const userDataRouter=Router();
import Problem from "../Models/problem.model.js";
import User from "../Models/user.model.js";
userDataRouter.post("/",async(req,res)=>{
    
    const username=req.body.username;
   
    const user=await User.findOne({userName:username});
    
    const problems=await Problem.find({});
  
    const noOfProblemsSolved=user.problemsSolved.length;
    const totalProblems=problems.length;
    res.status(200).json({userData:{noOfProblemsSolved,totalProblems}});
})
export default userDataRouter;