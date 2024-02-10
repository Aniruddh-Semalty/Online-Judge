import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import loginRouter from "./Routes/Login.js"

import signupRouter from "./Routes/Signup.js";

import problemRouter from "./Routes/Problem.js";

const app = express();

const PORT = process.env.PORT;

dotenv.config();

app.use(cors());

app.use(express.json());

app.use("/login",loginRouter);

app.use("/signup",signupRouter);

app.use("/problem",problemRouter);


app.listen(PORT, () => {
  console.log("App is running ");
});
