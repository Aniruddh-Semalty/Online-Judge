import React, { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import {useParams} from "react-router-dom";
import {  useSelector } from "react-redux"

function Playground() {



  const [language,setLanguage]=useState("cpp");
  const inputRef=useRef();
  
  const username=useSelector((store)=>store.user.userData);
  const {problemId} =useParams();
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [output,setOutput]=useState(undefined);
  
  const setTheOutputDiv=(data)=>{
    setOutput(data);
  }

  const runClickHandler = async() => {
   
    const response=await axios.post("http://localhost:3000/problem/run",{
        language,
        code,
        submit:false,
        inputs:inputRef.current.value
    })
    
    setTheOutputDiv(response.data.output);
  };

  const submitHandler=async()=>{
    const response=await axios.post("http://localhost:3000/problem/run",{
        language,
        code,
        probId:problemId,
        submit:true,
        username,
    })
   
    setTheOutputDiv(response.data.output);
  }

  useEffect(()=>{
    const response=axios.post("",{});
    
  },[]);

 
  return (
    <>
    <div >
     <select className="m-4 p-1 bg-[#202020] text-white " onChange={(e)=>{
      setLanguage(e.target.value);
     }} >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
    </select>
      <div>
   
        <Editor
          value={code}
          className="h-auto drop-shadow-lg"
          
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: "none",
            border: "none",
            backgroundColor: "#f7fafc",
            height: "100%",
            overflowY: "auto",
          }}
        />
      </div>
      <div className="m-4">
        <button className=" m-2 bg-green-700 text-white rounded-md w-16 h-10" onClick={runClickHandler}>
          Run
        </button>
        <button className=" m-2 bg-red-700 text-white rounded-md w-16 h-10" onClick={submitHandler}>
          Submit
        </button>
      </div>
           {/* Input textarea */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Input</h2>
          <textarea
            rows='6'
            cols='15'
            placeholder='Input'
            ref={inputRef}
            className="border border-gray-300 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
            style={{ minHeight: '100px' }}
          ></textarea>
        </div>
      
      <div className="bg-gray-100 rounded-sm shadow-md p-4 h-32 my-10">
        <h2 className="text-lg font-semibold mb-2">Output</h2>
        <div
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        >{output}</div>
      </div>
    </div>
    </>
  );
}

export default Playground;
