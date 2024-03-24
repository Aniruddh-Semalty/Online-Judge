import { Link } from "react-router-dom";

import axios from "axios";
import { useFormik } from "formik";

import { SignupSchema } from "./validation/signupSchema.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const Signup = () => {
  const navigate = useNavigate();
  const initialUserData = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [signupError, setSignupError] = useState(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialUserData,
      validationSchema: SignupSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_PORT}signup`,
            {
              values,
            }
          );
          alert("User signed up successfully");
          navigate("/login");
        } catch (error) {
          setSignupError(error.response.data.message);
        }
      },
    });
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center md:my-6 ">
          <div className=" border p-16 w-full md:w-[400px] border-white flex flex-col justify-center items-center bg-gray-200 rounded-md ">
            <label className="w-full">
              <input
                className=" p-3 text-sm border-gray-500 w-full h-12 rounded-md shadow-md my-2"
                autoComplete="off"
                onChange={handleChange}
                name="firstName"
                placeholder="firstname"
                type="text"
                value={values.firstName}
                onBlur={handleBlur}
              />
            </label>

            {errors.firstName && touched.firstName ? (
              <div className="w-full">
                <p className="text-sm text-red-600">{errors.firstName}</p>
              </div>
            ) : null}
            <label className="w-full">
              <input
                className=" p-3 text-sm border-gray-500 w-full h-12 rounded-md shadow-md my-2"
                placeholder="last name"
                type="text"
                autoComplete="off"
                onChange={handleChange}
                name="lastName"
                value={values.lastName}
                onBlur={handleBlur}
              />
            </label>
            {errors.lastName && touched.lastName ? (
              <div className="w-full">
                <p className="text-sm text-red-600">{errors.lastName}</p>
              </div>
            ) : null}
            <label className="w-full">
              <input
                className=" p-3 text-sm border-gray-500 w-full h-12 rounded-md shadow-md my-2"
                placeholder="User name"
                type="text"
                autoComplete="off"
                onChange={handleChange}
                name="userName"
                value={values.userName}
                onBlur={handleBlur}
              />
            </label>
            {errors.userName && touched.userName ? (
              <div className="w-full">
                <p className="text-sm text-red-600">{errors.userName}</p>
              </div>
            ) : null}
            <label className="w-full">
              <input
                className=" p-3 text-sm border-gray-500 w-full h-12 rounded-md shadow-md my-2"
                placeholder="Email Id"
                type="text"
                autoComplete="off"
                onChange={handleChange}
                name="email"
                value={values.email}
                onBlur={handleBlur}
              />
            </label>
            {errors.email && touched.email ? (
              <div className="w-full">
                <p className="text-sm text-red-600">{errors.email}</p>
              </div>
            ) : null}
            <label className="w-full">
              <input
                className=" p-3 text-sm border-gray-500 w-full h-12 rounded-md shadow-md my-2"
                placeholder="Password"
                type="password"
                autoComplete="off"
                onChange={handleChange}
                name="password"
                value={values.password}
                onBlur={handleBlur}
              />
            </label>
            {errors.password && touched.password ? (
              <div className="w-full">
                <p className="text-sm text-red-600">{errors.password}</p>
              </div>
            ) : null}
            <label className="w-full">
              <input
                className=" p-3 text-sm border-gray-500 w-full h-12 rounded-md shadow-md my-2"
                type="password"
                autoComplete="off"
                onChange={handleChange}
                name="confirmPassword"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onBlur={handleBlur}
              />
            </label>
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="w-full">
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              </div>
            ) : null}
            <div className="w-full">
              <input
                type="submit"
                className="bg-[#202020] text-[#F0F0F0] w-full h-10 rounded-lg my-4 "
                value="Sign up"
              />
            </div>
            <div>
              <p className="text-sm text-red-600">{signupError}</p>
            </div>
            <div>
              <Link
                to="/login"
                className="no-underline text-gray-600 shadow-lg"
              >
                <div className="">
                  Have an account ?{" "}
                  <span className="text-[#202020]">Signin</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
