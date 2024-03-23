import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";
const UserHome = () => {
    const user=useSelector((store)=>store.user.userData);
    
    const [problemsSolved,setProblemsSolved]=useState(null);
    const [totalProblems,setTotalProblems]=useState(null);

    const fetchData=async()=>{
       
        const response=await axios.post("http://localhost:3000/user",{
           username:user
        });
       
        setProblemsSolved(response.data.userData.noOfProblemsSolved);
        
        setTotalProblems(response.data.userData.totalProblems);
    }
    useEffect(()=>{
        fetchData();
        
    },[]);
  return (
    <div className='h-auto  flex justify-center  '>

    <div className='mt-10 w-9/12 md:w-1/2 flex-col '>
    <div className='text-center'>
    <h1 className='text-3xl md:text-5xl font-serif text-[#202020]'>Welcome  {user}</h1>
    </div>
    <div className='mt-24 bg-[#202020] text-white p-6  rounded-3xl   '>
    <div className='flex justify-between m-6  p-2 '>
    <span className='text-xl md:text-3xl font-serif  '>Problems solved</span>
    <span className='text-xl md:text-3xl font-serif  '>{problemsSolved}</span>
    </div>
    <div className='flex justify-between m-6  p-2 '>
    <span className='text-xl md:text-3xl font-serif  '>Total problems</span>
    <span className='text-xl md:text-3xl font-serif  '>{totalProblems}</span>
    </div>
    <div className='flex justify-between m-5   p-2 '>
    <span className='text-xl md:text-3xl font-serif  '>Completion percentage</span>
    <span className='text-xl md:text-3xl font-serif  '>{(problemsSolved/totalProblems*100).toFixed(2)}%</span>
    </div>
    </div>




    </div>





    </div>
  )
}

export default UserHome