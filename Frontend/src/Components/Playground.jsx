import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

function Playground() {
  // const codeInputRef = useRef();
  // const [language, setLanguage] = useState("cpp");
  // const [code, setCode] = useState(undefined);
  // const runClickHandler = async() => {
  //   await setCode(codeInputRef.current.value);
  //   console.log(code);
  //   const response=await axios.post("http://localhost:3000/problem/run",{
  //       language,
  //       code,
  //   })
  //   console.log(response);
  // };

  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  return (
    <div >
     <select className="m-4 p-1 bg-[#202020] text-white " >
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
        <button className=" m-2 bg-green-700 text-white rounded-md w-16 h-10">
          Run
        </button>
        <button className=" m-2 bg-red-700 text-white rounded-md w-16 h-10">
          Submit
        </button>
      </div>

      <div className="bg-gray-100 rounded-sm shadow-md p-4 h-32 my-10">
        <h2 className="text-lg font-semibold mb-2">Output</h2>
        <div
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Playground;
