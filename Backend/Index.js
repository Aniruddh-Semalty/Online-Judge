import express from "express";
import bodyParser from "body-parser";
const app=express();
const PORT =3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hi from dashboard");


})

app.get("/login",(req,res)=>{
    res.send("hi from login")

});


app.get("/signup",(req,res)=>{
    res.send("hi from signup")

})


app.listen(PORT,()=>{
    console.log("App is running ");
})


