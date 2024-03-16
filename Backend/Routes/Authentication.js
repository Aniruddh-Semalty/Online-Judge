import {Router} from "express";
const authenticationRouter=Router();

import isAuthenticated from "../utils/isAuthenticated.js";
authenticationRouter.post("/",async(req,res)=>{
    const token=req.body.token;
    const user=await isAuthenticated(token);
  
    res.status(200).json({user});
})
export default authenticationRouter;