import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../utils/Store/userSlice";
import Cookies from "js-cookie";
import { useState } from "react";
export default function Header() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const user = useSelector((store) => store.user.userData);
  const logoutHandler = () => {
    Cookies.remove("token");
    dispatch(logout(null));
    navigate("/login")
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="flex justify-between bg-[#202020] p-4 items-center w-full ">
      <div className="w-48">
        <Link to="/" className="no-underline font-bold text-3xl text-[#F0F0F0]">
          Online Judge
        </Link>
      </div>
      <div className="flex items-center justify-between ">
        <div>
          <Link
            to="/"
            className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg hover:text-2xl"
          >
            Dashboard
          </Link>
        </div>
        <div>
          <Link
            to="/problems"
            className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg hover:text-2xl"
          >
            Problems
          </Link>
        </div>
        <div>
          <Link
            to="/Leaderboard"
            className="no-underline mx-4 text-[#F0F0F0] font-bold text-lg hover:text-2xl"
          >
            Leaderboard
          </Link>
        </div>
        <div className="relative">
          {user ? (
            <div className="w-6 mx-2" onClick={toggleDropdown}>
              <img
                className="w-6 rounded-full"
                src="https://secure.gravatar.com/avatar/d91bcf9a7b821a11a0692fba6b5660ea?s=100&d=mm&r=g"
              />
              {isDropdownOpen && ( // Render dropdown content if dropdown is open
                <div className="absolute mt-4 bg-[#202020] text-white rounded-md py-2 w-[120px] max-w-[200px] right-0">
                  <Link className="block px-4 py-2 hover:bg-gray-700 hover:text-white">
                    {user}
                  </Link>
                  <div
                    className="block px-4 py-2 hover:bg-gray-700 hover:text-white cursor-pointer"
                    onClick={logoutHandler}
                  >
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              
              <Link
                to="/login"
                className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg"
              >
               Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
