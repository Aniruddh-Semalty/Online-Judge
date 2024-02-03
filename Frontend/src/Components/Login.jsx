/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../../public/Login.css";
import axios from "axios";
const base_url = "http://localhost:3000/";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function sendData() {
    const data = {
      username: username,
      password: password,
    };
    axios
      .post(base_url + "login", {
        data,
      })
      .then((response) => {
        console.log(response);
      }),
      (error) => {
        console.log(error);
      };
  }

  return (
    <div className="form-container">
      <form method="post">
        <div className="login-form-container">
          <div className="mb-4 ">
            <label>
              Username
              <br />
              <input
                type="text"
                id="username"
                className="box-border mt-2"
                placeholder="Enter username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Password
              <br />
              <input
                type="password"
                id="pass"
                className="box-border mt-2"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <input
              type="button"
              className="btn btn-primary"
              value="login"
              onClick={() => {
                sendData();
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
