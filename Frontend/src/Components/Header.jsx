/* eslint-disable react/jsx-no-undef */

import { Link } from 'react-router-dom';
import "../../public/Header.css"

export default function Header(){
    return (
       <div className="navbar-container">
          <div className="navbar-brand-container"><Link to="/" className="link">Online Judge</Link></div>
          <div className='navbar-links-container'>
            <div><Link to="/" className="link">Dashboard</Link></div>
            <div><Link to="/problems" className="link">Problems</Link></div>
            <div><Link to="/Leaderboard" className="link">Leaderboard</Link></div>
          </div>
        
       </div>
    )
}