import express from "express";

import cors from "cors";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import loginRouter from "./Routes/Login.js";

import signupRouter from "./Routes/Signup.js";

import problemRouter from "./Routes/Problem.js";

import runProblemRouter from "./Routes/runProblem.js";

import submissionRouter from "./Routes/Submission.js";
import { urlencoded } from "express";
import leaderboardRouter from "./Routes/Leaderboard.js";
import authenticationRouter from "./Routes/Authentication.js";
import userDataRouter from "./Routes/userData.js";
const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/signup", signupRouter);

app.use("/login", loginRouter);

app.use("/authentication", authenticationRouter);

app.use("/problem", problemRouter);

app.use("/problem/run", runProblemRouter);

app.use("/getsubmission", submissionRouter);

app.use("/leaderboard", leaderboardRouter);

app.use("/user", userDataRouter);
app.listen(PORT, () => {
  console.log("App is running ");
});
