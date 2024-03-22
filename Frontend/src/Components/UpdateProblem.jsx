import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProblem = () => {

  const { problemId } = useParams();
  const navigate=useNavigate();
  const [problemName,setProblemName]=useState(null);
  const [problemStatement,setProblemStatement]=useState(null)
  const [difficultyLevel,setDifficultyLevel]=useState(null);
  const [expectedInput,setExpectedInput]=useState(null);
  const [expectedOutput,setExpectedOutput]=useState(null);
  
  const fetchProblem = async () => {
    const response = await axios.get(
      `http://localhost:3000/problem/${problemId}`
    );

    setProblemName(response.data?.problemDetails?.Name);
    setProblemStatement(response.data?.problemDetails?.Statement);
    setDifficultyLevel(response.data?.problemDetails?.Difficulty);
    setExpectedInput(response.data?.probTestcases?.input);
    setExpectedOutput(response.data?.probTestcases?.output);

  }   

  
  const updateHandler=async()=>{
    console.log(problemName);
    console.log(problemStatement);
    console.log(difficultyLevel);
    console.log(expectedInput);
    console.log(expectedOutput);

    const response=await axios.put(`http://localhost:3000/problem/${problemId}`,{
      problemName,
      problemStatement,
      difficultyLevel,
      expectedInput,
      expectedOutput
    })
    console.log(response);
    
    setProblemName(response.data?.problem?.Name);
    setProblemStatement(response.data?.problem?.Statement);
    setDifficultyLevel(response.data?.problem?.Difficulty);
    setExpectedInput(response.data?.testcase?.input);
    setExpectedOutput(response.data?.testcase?.output);
  }
  const deleteHandler=async()=>{
    const response=await axios.delete(`http://localhost:3000/problem/${problemId}`);
    console.log(response);
    navigate("/problems");
  
  }
  useEffect(() => {
    fetchProblem();
  }, []);
  return (
    <div className="problempage-container  flex justify-center  ">
    <div className="problempage-inner-container my-16 w-1/2 bg-gray-200 p-8 rounded-md">
    <div className="w-full my-4">
    <label>
        <h5 className="text-2xl font-mono text-center">Type in boxes to update this problem:</h5>
       
    </label>
    </div>
    <div className="w-full my-4">
    <label>
        <h5 className="text-xl font-bold text-center">Problem Name:</h5>
        <input className=" mt-4 w-full rounded-md h-12 shadow-md p-4 text-md "type="text" defaultValue={problemName} value={problemName}onChange={(e)=>{
            setProblemName(e.target.value);
        }}/>
    </label>
    </div>
    <div className="w-full my-4">
    <label className="">
      <h5 className="text-xl font-bold text-center">Problem Statement:</h5>
      <textarea 
type="text" 
value={problemStatement}
defaultValue={problemStatement}
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
       }} value={difficultyLevel}>
        <option value="easy" className="font-bold">Easy</option>
        <option value="medium" className="font-bold">Medium</option>
        <option value="hard" className="font-bold">Hard</option>
       </select>
    </label>
    </div>
    <div className="w-full my-4 text-center">
    <label>
      <h5 className="text-xl font-bold text-center">Expected input</h5>
        <textarea type="text" value={expectedInput}  defaultValue={expectedInput}className="mt-4 w-full rounded-md h-40 shadow-md p-4 text-md resize-none "   placeholder="Inputs" onChange={(e)=>{
            setExpectedInput(e.target.value);
        }}/>
    </label>
    </div>
    <div className="w-full my-4 text-center">
    <label>
      <h5 className="text-xl font-bold text-center">Expected Output</h5>
        <textarea type="text" value={expectedOutput}defaultValue={expectedOutput}className="mt-4 w-full rounded-md h-40 shadow-md p-4 text-md resize-none "   placeholder="Outputs" onChange={(e)=>{
            setExpectedOutput(e.target.value);
        }}/>
    </label>
    </div>
    <div className="w-full my-4 text-center">
      <button className="bg-[#202020] text-white font-bold rounded-md shadow-lg w-1/3 mx-2 h-14"onClick={updateHandler}>Update problem</button>
      <button className="bg-[#202020] text-white font-bold rounded-md shadow-lg w-1/3 h-14 mx-2"onClick={deleteHandler}>Delete problem</button>
    </div>
    </div>
    </div>
  );
};

export default UpdateProblem;
