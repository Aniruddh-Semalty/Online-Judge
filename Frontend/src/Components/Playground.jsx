import React from "react";
import { useState, useRef } from "react";
import axios from "axios";


function Playground() {
  const codeInputRef = useRef();
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(undefined);
  const runClickHandler = async() => {
    await setCode(codeInputRef.current.value);
    console.log(code);
    const response=await axios.post("http://localhost:3000/problem/run",{
        language,
        code,
    })
    console.log(response);
  };
  return (
    <div>
      <select
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
      >
        <option value="cpp">C++</option>
        <option value="js">Javascript</option>
        <option value="py">Python</option>
      </select>
      <input
      
        type="text"
        placeholder="Write your code here"
        ref={codeInputRef}
      />
      
      <button onClick={runClickHandler}>Run</button>
    </div>
  );
}

export default Playground;
