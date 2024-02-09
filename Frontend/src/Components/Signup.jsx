import("../../public/Signup.css");

import axios from "axios";
import { useFormik } from "formik";

import "../../public/Signup.css";
import { SignupSchema } from "./validation/index.jsx";

export const Signup = () => {
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
        } catch (e) {
          console.log(e);
        }
      },
    });
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="signup-container">
          <div className="signup-form-container">
            <label className="mb-2">
              FirstName
              <br />
              <input
                className="box-border mt-2"
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
            <label className="mb-2">
              LastName
              <br />
              <input
                className="box-border mt-2"
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
            <label className="mb-2">
              UserName
              <br />
              <input
                className="box-border mt-2"
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
            <label className="mb-2">
              Enter Email
              <br />
              <input
                className="box-border mt-2"
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
              <p className="form-error">{errors.email}</p>
            ) : null}
            <label className="mb-2">
              Enter password
              <br />
              <input
                className="box-border mt-2"
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
            <label className="mb-2">
              Confirm password
              <br />
              <input
                className="box-border mt-2"
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
            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" />
          </div>
        </div>
      </form>
    </section>
  );
};
