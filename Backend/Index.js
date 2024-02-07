import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config();
const app=express();
const PORT =process.env.PORT;
app.use(cors());
app.use(express.json());



app.get("/",(req,res)=>{

    const user=new User({username:"Aniruddh",password:"1234s"});
    user.save().then(()=>{
        console.log("user saved");
    })
    res.status(200).json({"msg":"USer saved"});

})

// app.post("/register",(req,res)=>{
    
// })

app.get("/login",(req,res)=>{
    res.json({
        "message":"hi from req"
    })
})
app.post("/login",(req,res)=>{
      const {username,password}=req.body.data;
       console.log(username,password);
    res.json({"message":"Form submitted successfully"});


})




app.get("/signup",(req,res)=>{
    res.send("hi from signup")

})


app.listen(PORT,()=>{
    console.log("App is running ");
})


