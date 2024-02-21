/* eslint-disable no-unused-vars */
import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "./validation/loginSchema.jsx";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
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
        <div className="flex justify-center items-center m-20">
          <div className=" border p-16 w-[400px] border-white flex flex-col justify-center items-center bg-gray-200 ">
            <div className="w-full">
              <label className="w-full">
                <input
                  type="text"
                  name="userName"
                  className=" p-3 text-sm border-gray-500 w-full h-12 rounded-md shadow-md my-2"
                  placeholder="Username or Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                />
              </label>
              {errors.userName && touched.userName ? (
                <p className="form-error">{errors.userName}</p>
              ) : null}
            </div>
            <div className="w-full">
              <label className="w-full">
                <input
                  type="password"
                  name="password"
                  className="border  p-3 text-sm border-gray-500 w-full h-12 rounded-md shadow-md my-2"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div className="w-full">
              <input
                type="submit"
                className="bg-[#202020] text-[#F0F0F0] w-full h-10 rounded-lg my-4 "
                value="Sign in"
              />
            </div>
            <div>
              <Link
                to="/signup"
                className="no-underline text-gray-600 shadow-lg"
              >
                <div className="">New here ?<span className="text-[#202020]"> Signup</span></div>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
