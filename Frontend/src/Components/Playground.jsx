import React, { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Playground() {
  const [language, setLanguage] = useState("cpp");
  const inputRef = useRef();

  const username = useSelector((store) => store.user.userData);
  const { problemId } = useParams();
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [output, setOutput] = useState(undefined);

  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const [isDisabled, setDisabled] = useState(false);

  const setTheOutputDiv = (data) => {
    setOutput(data);
  };

  const runClickHandler = async () => {
    setSubmitClicked(false);
    setTheOutputDiv(null);
    setLoading(true);
    setDisabled(true);
    const response = await axios.post(
      `${import.meta.env.VITE_API_PORT}problem/run`,
      {
        language,
        code,
        submit: false,
        inputs: inputRef.current.value,
      }
    );

    await setTheOutputDiv(response.data.output);

    await setLoading(false);
    setDisabled(false);
  };

  const submitHandler = async () => {
    setTheOutputDiv(null);

    setLoading(true);
    setDisabled(true);
    const response = await axios.post(
      `${import.meta.env.VITE_API_PORT}problem/run`,
      {
        language,
        code,
        probId: problemId,
        submit: true,
        username,
      }
    );
    setSubmitClicked(true);

    await setTheOutputDiv(response.data.output);
    await setLoading(false);

    setDisabled(false);
  };

  useEffect(() => {
    const response = axios.post("", {});
  }, []);

  return (
    <>
      <div>
        <select
          className="m-4 p-1 bg-[#202020] text-white "
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
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
              height: "100",
              overflowY: "auto",
            }}
          />
        </div>
        <div className="m-4 flex items-center">
          <button
            className={`m-2 bg-green-700 text-white rounded-md w-16 h-10 ${
              isDisabled ? "opacity-50" : ""
            }`}
            onClick={runClickHandler}
            disabled={isDisabled}
          >
            Run
          </button>
          <button
            className={`m-2 flex items-center bg-red-700 text-white rounded-md w-16 h-10 p-2
             ${isDisabled ? "opacity-50" : ""}`}
            onClick={submitHandler}
            disabled={isDisabled}
          >
            Submit
          </button>
          {loading && (
            <div role="status" className="mx-4">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </div>

        {/* Input textarea */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Input</h2>
          <textarea
            rows="6"
            cols="15"
            placeholder="Input"
            ref={inputRef}
            className="border border-gray-300 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
            style={{ minHeight: "100px" }}
          ></textarea>
        </div>

        <div className="bg-gray-100 rounded-sm shadow-md p-4 h-32 my-10">
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <div
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          >
            {submitClicked ? (
              output ? (
                <div>
                  <button className="bg-green-700 p-2 text-md text-white rounded-md">
                    {output}
                  </button>
                </div>
              ) : null
            ) : (
              output
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Playground;
