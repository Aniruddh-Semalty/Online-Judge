import("../../public/PostProblems.css")
import {useState} from "react";
import axios from "axios";
const PostProblems=()=>{
const [problemName,setProblemName]=useState(" ");
const [problemStatement,setProblemStatement]=useState(" ");
const [difficultyLevel,setDifficultyLevel]=useState(" ");
const [solutionCode,setSolutionCode]=useState(" ");

const clickHandler=async()=>{
  try{
  const response=await axios.post("http://localhost:3000/problem",{
    problemName,
    problemStatement,
    difficultyLevel,
    solutionCode
  })
  console.log(response);
  }
  catch(e)
  {
    console.log(e);
  }
}
    return (
        <div className="problempage-container">
        <div className="problempage-inner-container">
        <div>
        <label>
            <h5>Problem Name:</h5>
            <input className="name-inputbox"type="text" placeholder="name" onChange={(e)=>{
                setProblemName(e.target.value);
            }}/>
        </label>
        </div>
        <div className="problem-statement-container">
        <label className="problem-statement-label-container">
          <h5>Problem Statement:</h5>
            <input type="text" className="problem-statement-inputbox"placeholder="statement" onChange={(e)=>{
                setProblemStatement(e.target.value);
            }}/>
        </label>
        </div>
        <div>
        <label>
          <h5>Problem Difficulty Level:</h5>
            {/* <input type="text" className="difficulty-inputbox" placeholder="Easy/Med/Hard" onChange={(e)=>{
                 setDifficultyLevel(e.target.value);   }}/>*/}
           <select className="difficulty-selectbox"onChange={(e)=>{
            setDifficultyLevel(e.target.value);
           }}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
           </select>
        </label>
        </div>
        <div>
        <label>
          <h5>Code:</h5>
            <input type="text" className="code-inputbox" placeholder="code" onChange={(e)=>{
                setSolutionCode(e.target.value);
            }}/>
        </label>
        </div>
        <div>
          <button onClick={clickHandler}>Add problem</button>
        </div>
        </div>
        </div>



        
    )
}

export default PostProblems;