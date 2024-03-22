import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Playground from "./Playground";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRole, login } from "../../utils/Store/userSlice";
import useAuthentication from "../../utils/hooks/useAuthentication";
import Editor from "react-simple-code-editor";
import { disableWorkerMessageHandler, highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

function GetProblem() {
  const user = useSelector((store) => store.user.userData);
  const [problemName, setProblemName] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [problemDifficulty, setProblemDifficulty] = useState("");
  const [lastSubmission, setLastSubmission] = useState("");
  const [showSubmission, setShowSubmission] = useState(false);
  const dispatch = useDispatch();

  const { problemId } = useParams();

  useEffect(() => {
    useAuthentication().then((data) => {
      dispatch(login(data.userName));
      dispatch(getRole(data.isAdmin))
    });
    fetchProblem();
  }, []);

  useEffect(() => {
    getSubmissionHandler();
  }, [showSubmission]);
  const username = useSelector((store) => store.user.userData);
  const fetchProblem = async () => {
    const response = await axios.get(
      `http://localhost:3000/problem/${problemId}`
    );

    const { Difficulty, Name, Statement } = response.data.problemDetails;

    setProblemName(Name);
    setProblemDifficulty(Difficulty);
    setProblemStatement(Statement);
  };
  const difficulty = problemDifficulty.toUpperCase();
  let textColor = "";
  if (difficulty == "EASY") {
    textColor = "text-green-700";
  } else if (difficulty == "HARD") {
    textColor = "text-red-700";
  } else {
    textColor = "text-yellow-700";
  }
  const getSubmissionHandler = async () => {
    const response = await axios.post("http://localhost:3000/getsubmission", {
      username,
      problemId,
    });

    setLastSubmission(response.data.submission);
  };

  const toggleSubmissionHandler = () => {
    setShowSubmission(!showSubmission);
  };

  return user ? (
    <div className="p-2  mb-0 flex justify-between">
      <div className="w-5/12  border-r-2 p-4 h-screen">
        <div className="p-2 flex justify-between items-center my-14 mt-0 ">
          <p className="font-bold text-2xl">{problemName}</p>
          <div className="border shadow rounded-md">
            <p className={textColor}>{difficulty}</p>
          </div>
        </div>

        <p className="text-lg ">{problemStatement}</p>
        <div className="flex my-20">
          View last submission{" "}
          <svg
            className="w-6"
            onClick={toggleSubmissionHandler}
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            id="down-arrow"
          >
            <path d="M17.71,11.29a1,1,0,0,0-1.42,0L13,14.59V7a1,1,0,0,0-2,0v7.59l-3.29-3.3a1,1,0,0,0-1.42,1.42l5,5a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l5-5A1,1,0,0,0,17.71,11.29Z"></path>
          </svg>
        </div>
        <section>
          <div className="w-full">
            {showSubmission ? (
              <div>
                <Editor
                  value={lastSubmission}
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
                    minHeight: "100px", // Set a minimum height to prevent the editor from collapsing
                    height: "auto", // Set height to auto to allow it to grow dynamically
                    overflowY: "auto",
                  }}
                />
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <div className="w-7/12 m-2">
        <Playground />
      </div>
    </div>
  ) : (
    <div className="font-bold text-3xl p-6">
      Please login before solving any problem
    </div>
  );
}

export default GetProblem;
