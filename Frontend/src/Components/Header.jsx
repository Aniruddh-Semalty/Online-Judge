/* eslint-disable react/jsx-no-undef */

import { Link } from 'react-router-dom';
// import "../../public/Header.css"

export default function Header(){
    return (
       <div className="flex justify-between bg-[#202020] p-4 align-middle w-full ">
          <div className=""><Link to="/" className="no-underline font-bold text-3xl text-[#F0F0F0]">Online Judge</Link></div>
          <div className="flex">
            <div><Link to="/" className="no-underline mx-4 text-[#F0F0F0] font-bold text-lg hover:text-2xl">Dashboard</Link></div>
            <div><Link to="/problems" className="no-underline mx-4 text-[#F0F0F0] font-bold text-lg hover:text-2xl">Problems</Link></div>
            <div><Link to="/Leaderboard" className="no-underline mx-4 text-[#F0F0F0] font-bold text-lg hover:text-2xl">Leaderboard</Link></div>
            
            <div><Link to="/login" className="no-underline mx-4 text-[#F0F0F0] font-bold text-lg hover:text-2xl">Login</Link></div>
          </div>
        
       </div>
    )
}