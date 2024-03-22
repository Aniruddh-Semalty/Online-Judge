import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  useSelector,useDispatch } from 'react-redux';
import useAuthentication from "../../utils/hooks/useAuthentication";
import { getRole, login } from "../../utils/Store/userSlice";
const Problems = () => {
  const [problems, setProblems] = useState([]);
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user.userData);
  
  useEffect(() => {
    useAuthentication().then((data)=>{
    
            dispatch(login(data.userName));
            dispatch(getRole(data.isAdmin))
    })
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    const response = await axios.get("http://localhost:3000/problem");
    const fetchedProblems = response.data;

    setProblems(() => {
      return fetchedProblems;
    });
  };

  
  return user?(
    <div className="my-20 ">
      {problems.map((prob, index) => {
        return (
          <div className="mx-28 bg-gray-200 ">
            <DisplayProblem details={prob} index={index} key={prob._id} />
          </div>
        );
      })}
    </div>):<div className="font-bold text-3xl p-6">Please login before solving any problem</div>
};
;

const DisplayProblem = ({ details, index }) => {
  const difficulty = details.Difficulty.toUpperCase();
  let textColor = "";
  if (difficulty == "EASY") {
    textColor = "text-green-700";
  } else if(difficulty=="HARD"){
    textColor = "text-red-700";
  }
  else{
    textColor="text-yellow-700"
  }
  const isAdmin=useSelector((store)=>store.user.isAdmin);
  
 let url;
{!isAdmin?url=`/problem/${details._id}`:url=`/update/${details._id}`}
  return (
    
    <Link
      className="no-underline font-bold  text-[#202020]"
      to={url}
    >
      <div className="my-6 border-b-4 shadow-sm p-2">
        <div className="flex justify-between items-center p-2">
          <p className="font-bold text-xl">
            {index + 1}.{details.Name}
          </p>

          <div className="w-20">
            <p className={textColor}>{details.Difficulty.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Problems;
