import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const UserHome = () => {
  const user = useSelector((store) => store.user.userData);
  const userIsAdmin = useSelector((store) => store.user.isAdmin);

  const [problemsSolved, setProblemsSolved] = useState(null);
  const [totalProblems, setTotalProblems] = useState(null);

  const fetchData = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_PORT}user`, {
      username: user,
    });

    setProblemsSolved(response.data.userData.noOfProblemsSolved);

    setTotalProblems(response.data.userData.totalProblems);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return !userIsAdmin?(
    <div className="h-auto  flex justify-center  ">
      <div className="mt-10 w-9/12 md:w-1/2 flex-col ">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-serif text-[#202020]">
            Welcome {user}
          </h1>
        </div>
        <div className="mt-24 bg-[#202020] text-white p-6  rounded-3xl   ">
          <div className="flex justify-between m-6  p-2 ">
            <span className="text-xl md:text-3xl font-serif  ">
              Problems solved
            </span>
            <span className="text-xl md:text-3xl font-serif  ">
              {problemsSolved}
            </span>
          </div>
          <div className="flex justify-between m-6  p-2 ">
            <span className="text-xl md:text-3xl font-serif  ">
              Total problems
            </span>
            <span className="text-xl md:text-3xl font-serif  ">
              {totalProblems}
            </span>
          </div>
          <div className="flex justify-between m-5   p-2 ">
            <span className="text-xl md:text-3xl font-serif  ">
              Completion percentage
            </span>
            <span className="text-xl md:text-3xl font-serif  ">
              {((problemsSolved / totalProblems) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  ):(  <div className="h-auto  flex justify-center  ">
      <div className="mt-20 md:mt-72 w-9/12 md:w-1/2 flex-col ">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-serif text-[#202020]">
            Welcome {user}
          </h1>
          <h1 className="mt-10 md:mt-20 text-xl md:text-3xl font-serif text-[#202020]">
            You have admin rights
          </h1>
        </div>
        </div>
        </div>)
};

export default UserHome;
