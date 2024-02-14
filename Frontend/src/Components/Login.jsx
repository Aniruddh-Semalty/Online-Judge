/* eslint-disable no-unused-vars */
import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "./validation/loginSchema.jsx";
import "../../public/Login.css";
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";

import "../../public/Signup.css";
export default function Login() {
  const navigate=useNavigate();
  const initialUserData = {
    userName: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialUserData,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post("http://localhost:3000/login", {
            values,
          });
          console.log(response);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      },
    });

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="login-form-container">
            <div className="mb-4 ">
              <label>
                Username
                <br />
                <input
                  type="text"
                  name="userName"
                  className="box-border mt-2"
                  placeholder="Enter username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                />
              </label>
              {errors.userName && touched.userName ? (
                <p className="form-error">{errors.userName}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <label>
                Password
                <br />
                <input
                  type="password"
                  name="password"
                  className="box-border mt-2"
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div>
              <input type="submit" className="btn btn-primary" value="login" />
            </div>
            <div>
                <Link to="/signup" ><div className="mt-4">New here?Signup</div></Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
