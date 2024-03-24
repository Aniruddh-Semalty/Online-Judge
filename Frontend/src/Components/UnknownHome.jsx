import React from "react";
import { useNavigate } from "react-router-dom";

const UnknownHome = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/login");
  };
  const signupHandler = () => {
    navigate("/signup");
  };
  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <div className="flex-col">
        <div>
          <h1 className="text-6xl font-serif  ">
            Start your coding journey today.
          </h1>
        </div>
        <div className="mt-10 w-full flex justify-between ">
          <button
            className="bg-[#202020]  text-white font-bold rounded-md p-4 w-32 mr-[50px] m-4"
            onClick={loginHandler}
          >
            Login
          </button>
          <button
            className="bg-[#202020] text-white  rounded-md font-bold p-4 w-32 m-4"
            onClick={signupHandler}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};
export default UnknownHome;
