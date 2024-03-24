import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProblem = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problemName, setProblemName] = useState(null);
  const [problemStatement, setProblemStatement] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [expectedInput, setExpectedInput] = useState(null);
  const [expectedOutput, setExpectedOutput] = useState(null);

  const fetchProblem = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_PORT}problem/${problemId}`
    );

    setProblemName(response.data?.problemDetails?.Name);
    setProblemStatement(response.data?.problemDetails?.Statement);
    setDifficultyLevel(response.data?.problemDetails?.Difficulty);
    setExpectedInput(response.data?.probTestcases?.input);
    setExpectedOutput(response.data?.probTestcases?.output);
  };

  const updateHandler = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_PORT}problem/${problemId}`,
      {
        problemName,
        problemStatement,
        difficultyLevel,
        expectedInput,
        expectedOutput,
      }
    );

    setProblemName(response.data?.problem?.Name);
    setProblemStatement(response.data?.problem?.Statement);
    setDifficultyLevel(response.data?.problem?.Difficulty);
    setExpectedInput(response.data?.testcase?.input);
    setExpectedOutput(response.data?.testcase?.output);
  };
  const deleteHandler = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_PORT}problem/${problemId}`
    );
   
    navigate("/problems");
  };
  useEffect(() => {
    fetchProblem();
  }, []);
  return (
    <div className=" flex justify-center  ">
      <div className="md:my-16 md:w-1/2 bg-gray-200 p-8 rounded-md w-full">
        <div className="w-full my-4">
          <label>
            <h5 className="md:text-2xl font-mono text-center">
              Type in boxes to update this problem:
            </h5>
          </label>
        </div>
        <div className="w-full my-4">
          <label>
            <h5 className="md:text-xl font-bold text-center">Problem Name:</h5>
            <input
              className=" mt-4 w-full rounded-md h-12 shadow-md p-4 text-sm md:text-md "
              type="text"
              defaultValue={problemName}
              value={problemName}
              onChange={(e) => {
                setProblemName(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="w-full my-4">
          <label className="">
            <h5 className="md:text-xl font-bold text-center">
              Problem Statement:
            </h5>
            <textarea
              type="text"
              value={problemStatement}
              defaultValue={problemStatement}
              className="mt-4 w-full rounded-md h-72 shadow-md p-4  resize-none text-sm md:text-md"
              placeholder="Describe your problem"
              onChange={(e) => {
                setProblemStatement(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="w-full my-4 text-center">
          <label>
            <h5 className="md:text-xl font-bold text-center">
              Problem Difficulty Level:
            </h5>
            {/* <input type="text" className="difficulty-inputbox" placeholder="Easy/Med/Hard" onChange={(e)=>{
             setDifficultyLevel(e.target.value);   }}/>*/}
            <select
              className="my-4 md:w-1/3 text-center bg-[#202020] text-white p-2 font-bold rounded-md "
              onChange={(e) => {
                setDifficultyLevel(e.target.value);
              }}
              value={difficultyLevel}
            >
              <option value="easy" className="font-bold">
                Easy
              </option>
              <option value="medium" className="font-bold">
                Medium
              </option>
              <option value="hard" className="font-bold">
                Hard
              </option>
            </select>
          </label>
        </div>
        <div className="w-full my-4 text-center">
          <label>
            <h5 className="md:text-xl font-bold text-center">Expected input</h5>
            <textarea
              type="text"
              value={expectedInput}
              defaultValue={expectedInput}
              className="mt-4 w-full rounded-md h-40 shadow-md p-4  resize-none text-sm md:text-md "
              placeholder="Inputs"
              onChange={(e) => {
                setExpectedInput(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="w-full my-4 text-center">
          <label>
            <h5 className="md:text-xl font-bold text-center">
              Expected Output
            </h5>
            <textarea
              type="text"
              value={expectedOutput}
              defaultValue={expectedOutput}
              className="mt-4 w-full rounded-md h-40 shadow-md p-4 resize-none text-sm md:text-md "
              placeholder="Outputs"
              onChange={(e) => {
                setExpectedOutput(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="w-full my-4 text-center">
          <button
            className="bg-[#202020] text-white font-bold rounded-md shadow-lg md:w-1/3 mx-2 h-14 p-2  text-sm md:text-lg"
            onClick={updateHandler}
          >
            Update problem
          </button>
          <button
            className="bg-[#202020] text-white font-bold rounded-md shadow-lg md:w-1/3 h-14 p-2 mx-2 text-sm md:text-lg"
            onClick={deleteHandler}
          >
            Delete problem
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProblem;
