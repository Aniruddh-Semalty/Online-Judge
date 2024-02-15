import React ,{useEffect,useState}from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
function GetProblem() {
  const [problemName,setProblemName]=useState("");
  const [problemStatement,setProblemStatement]=useState("");
  const [problemDifficulty,setProblemDifficulty]=useState("");

 const {problemId}=useParams();
 
 useEffect(()=>{
   fetchProblem();
  },[])

  const fetchProblem=async()=>{
    const response=await axios.get(`http://localhost:3000/problem/${problemId}`);
    const {Difficulty,Name,Statement}=response.data.problemDetails;
    setProblemName(Name);
    setProblemDifficulty(Difficulty);
    setProblemStatement(Statement);
  }

  return (
    <div>
      <div>
        <h1>{problemName}</h1>
        <h2>{problemDifficulty}</h2>
        <h3>{problemStatement}</h3>
      </div>
    </div>
  )
}

export default GetProblem