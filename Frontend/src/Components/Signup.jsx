
import { Link } from "react-router-dom";

import axios from "axios";
import { useFormik } from "formik";


import { SignupSchema } from "./validation/signupSchema.jsx";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const navigate=useNavigate();
  const initialUserData = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialUserData,
      validationSchema: SignupSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post("http://localhost:3000/signup", {
            values,
          });
          console.log(response);
          navigate("/login");
        } catch (e) {
          console.log(e);
        }
      },
    });
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center my-6 ">
          <div className=" border p-16 w-[400px] border-white flex flex-col justify-center items-center bg-gray-200 rounded-md ">
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
              <p className="form-error">{errors.firstName}</p>
            ) : null}
            <label className="w-full" >
             
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
              <p className="form-error">{errors.lastName}</p>
            ) : null}
            <label className="w-full" >
             
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
              <p className="form-error">{errors.userName}</p>
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
            </label >
            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
            <label className="w-full" >
            
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
              <p className="form-error">{errors.password}</p>
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
              <p className="form-error">{errors.confirmPassword}</p>
            ) : null}
            <div className="w-full">
            <input type="submit"  className="bg-[#202020] text-[#F0F0F0] w-full h-10 rounded-lg my-4 " value="Sign up" />
            </div>
            <div>
            <Link
                to="/login"
                className="no-underline text-gray-600 shadow-lg"
              >
                <div className="">Have an account ? <span className="text-[#202020]">Signin</span></div>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
