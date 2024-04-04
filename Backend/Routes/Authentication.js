import {Router} from "express";
const authenticationRouter=Router();

import isAuthenticated from "../utils/isAuthenticated.js";
authenticationRouter.post("/",async(req,res)=>{
    try{
    const token=req.body.token;
    const user=await isAuthenticated(token);
  
    res.status(200).json({user});
    }
    catch(e)
    {
        console.log(e);
    }
})
export default authenticationRouter;