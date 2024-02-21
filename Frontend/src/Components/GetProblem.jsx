import React ,{useEffect,useState}from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import Playground from './Playground';
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
  const difficulty =problemDifficulty.toUpperCase();
    let textColor = "";
    if (difficulty == "EASY") {
      textColor = "text-green-700";
    } else if(difficulty=="HARD"){
      textColor = "text-red-700";
    }
    else{
      textColor="text-yellow-700"
    }
    console.log(textColor);

 

  return (
    <div className='p-2  mb-0 flex justify-between'>
      <div className='w-5/12  border-r-2 p-4 h-screen'> 
        <div className='p-2 flex justify-between items-center my-14 mt-0 '>
        <p className='font-bold text-2xl'>{problemName}</p>
        <div className='border shadow rounded-md'>
       <p className={textColor}>{difficulty}</p>
        </div>
        </div>
        <p className='text-lg '>{problemStatement}</p>
        <div className="mt-6">
        {/* Input textarea */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Input</h2>
          <textarea
            rows='6'
            cols='15'
          
            placeholder='Input'
            
            className="border border-gray-300 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
            style={{ minHeight: '100px' }}
          ></textarea>
        </div>
      </div>
      </div>
      <div className='w-7/12 m-2'>
        <Playground/>
      </div>
    </div>
   
  )
}

export default GetProblem