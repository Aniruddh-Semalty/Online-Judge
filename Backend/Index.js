import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config();
const app=express();
const PORT =process.env.PORT;
app.use(cors());
app.use(express.json());
import User from "./Models/UserSchema.js";


app.get("/",(req,res)=>{

    try{
    const user=new User({username:"Abhishek",password:"1234",fullName:"Aniruddh Semalty"});
    user.save().then(()=>{
        console.log("user saved");
    })
    res.status(200).json({"msg":"USer saved"});
    }
    catch(error)
    {
        res.status(400).json({"error":error})
    }
   

})

// app.post("/register",(req,res)=>{
    
// })

app.get("/login",(req,res)=>{
    res.json({
        "message":"hi from login"
    })
})
app.post("/login",async(req,res)=>{
    //   const {username,password}=req.body.data;
      const response=await User.find({username:"Aniruddh",password:"1234s"})
      if(response.length==0)
      {
        return res.status(400).send({message:"Invalid User!Please check your email and password" })
      }
       res.status(200).send({message:" logged in successfully"});
})




app.post("/signup",(req,res)=>{
    const response=req.body.values;
    console.log(response);

})

app.get("/signup",(req,res)=>{
    res.send("hi from signup")

})


app.listen(PORT,()=>{
    console.log("App is running ");
})


