import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

const app=express();
const PORT =3000;
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{


})

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


