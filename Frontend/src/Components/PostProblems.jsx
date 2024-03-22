
import {useState} from "react";
import axios from "axios";
const PostProblems=()=>{
const [problemName,setProblemName]=useState(" ");
const [problemStatement,setProblemStatement]=useState(" ");
const [difficultyLevel,setDifficultyLevel]=useState(" ");
const [expectedInput,setExpectedInput]=useState(null);
const [expectedOutput,setExpectedOutput]=useState(null);

const clickHandler=async()=>{

  // console.log(`${problemName} # ${problemStatement} # ${difficultyLevel} # ${expectedInput} # ${expectedOutput}`)
  try{
  const response=await axios.post("http://localhost:3000/problem",{
    problemName,
    problemStatement,
    difficultyLevel,
    expectedInput,
    expectedOutput,
  })
  console.log(response);
  }
  catch(e)
  {
    console.log(e);
  }
}
    return (
        <div className="problempage-container  flex justify-center  ">
        <div className="problempage-inner-container my-16 w-1/2 bg-gray-200 p-8 rounded-md">
        <div className="w-full my-4">
        <label>
            <h5 className="text-xl font-bold text-center">Problem Name:</h5>
            <input className=" mt-4 w-full rounded-md h-12 shadow-md p-4 text-md "type="text" placeholder="Enter name of the problem" onChange={(e)=>{
                setProblemName(e.target.value);
            }}/>
        </label>
        </div>
        <div className="w-full my-4">
        <label className="">
          <h5 className="text-xl font-bold text-center">Problem Statement:</h5>
          <textarea 
    type="text" 
    className="mt-4 w-full rounded-md h-72 shadow-md p-4 text-md resize-none" 
    placeholder="Describe your problem" 
    onChange={(e) => {
        setProblemStatement(e.target.value);
    }}
/>
        </label>
        </div>
        <div className="w-full my-4 text-center">
        <label>
          <h5 className="text-xl font-bold text-center">Problem Difficulty Level:</h5>
            {/* <input type="text" className="difficulty-inputbox" placeholder="Easy/Med/Hard" onChange={(e)=>{
                 setDifficultyLevel(e.target.value);   }}/>*/}
           <select className="my-4 w-1/3 text-center bg-[#202020] text-white p-2 font-bold rounded-md "onChange={(e)=>{
            setDifficultyLevel(e.target.value);
           }}>
            <option value="easy" className="font-bold">Easy</option>
            <option value="medium" className="font-bold">Medium</option>
            <option value="hard" className="font-bold">Hard</option>
           </select>
        </label>
        </div>
        <div className="w-full my-4 text-center">
        <label>
          <h5 className="text-xl font-bold text-center">Expected input</h5>
            <textarea type="text" className="mt-4 w-full rounded-md h-40 shadow-md p-4 text-md resize-none "   placeholder="Inputs" onChange={(e)=>{
                setExpectedInput(e.target.value);
            }}/>
        </label>
        </div>
        <div className="w-full my-4 text-center">
        <label>
          <h5 className="text-xl font-bold text-center">Expected Output</h5>
            <textarea type="text" className="mt-4 w-full rounded-md h-40 shadow-md p-4 text-md resize-none "   placeholder="Outputs" onChange={(e)=>{
                setExpectedOutput(e.target.value);
            }}/>
        </label>
        </div>
        <div className="w-full my-4 text-center">
          <button className="bg-[#202020] text-white font-bold rounded-md shadow-lg w-1/3 h-14"onClick={clickHandler}>Add problem</button>
        </div>
        </div>
        </div>



        
    )
}

export default PostProblems;