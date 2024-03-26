/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "./validation/loginSchema.jsx";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../utils/Store/userSlice.js";
import Cookies from "js-cookie";
import { getRole } from "../../utils/Store/userSlice.js";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialUserData = {
    userName: "",
    password: "",
  };
  const [loginError, setLoginError] = useState(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialUserData,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_PORT}login`,
            {
              values,
            }
          );

          if (response.status == 200) {
            Cookies.set("token", response.data.token, {
              expires: 7,
              path: "/",
            });
            dispatch(login(response.data.userName));
            dispatch(getRole(response.data.isAdmin));

            navigate("/");
          }
        } catch (error) {
          setLoginError(error.response.data.message);
        }
      },
    });

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center md:m-20 ">
          <div className=" border p-16 w-full md:w-[400px] border-white flex flex-col justify-center items-center bg-gray-200 ">
            <div className="w-full">
              <label className="w-full">
                <input
                  type="text"
                  name="userName"
                  className=" p-3 text-sm border-gray-500 w-full h-12 rounded-md shadow-md my-2"
                  placeholder="Username "
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                />
              </label>
              {errors.userName && touched.userName ? (
                <div className="w-full">
                  <p className="text-sm text-red-600">{errors.userName}</p>
                </div>
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
                <div className="w-full">
                  <p className="text-sm text-red-600">{errors.password}</p>
                </div>
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
              <p className="text-sm text-red-600">{loginError}</p>
            </div>
            <div>
              <Link
                to="/signup"
                className="no-underline text-gray-600 shadow-lg"
              >
                <div className="">
                  New here ?<span className="text-[#202020]"> Signup</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
