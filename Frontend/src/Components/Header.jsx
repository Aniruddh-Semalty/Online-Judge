import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../utils/Store/userSlice";
import Cookies from "js-cookie";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
export default function Header() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userData);
  const userIsAdmin = useSelector((store) => store.user.isAdmin);
  const logoutHandler = () => {
    Cookies.remove("token");
    dispatch(logout(null));
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen(!open);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between bg-[#202020] p-4 items-center w-full  ">
        {/*logo*/}
        <div className="w-48">
          <Link
            to="/"
            className="no-underline  md:text-3xl text-[#F0F0F0] font-extrabold text-xl"
          >
            {import.meta.env.VITE_APP_NAME}
          </Link>
        </div>

        {/*navlink*/}
        <div className="hidden md:block">
          <div className="flex items-center justify-between ">
            {user && !userIsAdmin ? (
              <div>
                <Link
                  to="/"
                  className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg hover:text-2xl"
                >
                  Dashboard
                </Link>
              </div>
            ) : null}
            {userIsAdmin ? (
              <div>
                <Link
                  to="/addproblem"
                  className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg"
                >
                  Add a problem
                </Link>
              </div>
            ) : null}
            {userIsAdmin ? (
              user ? (
                <div>
                  <Link
                    to="/problems"
                    className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg hover:text-2xl"
                  >
                    Update/Delete problems
                  </Link>
                </div>
              ) : null
            ) : user ? (
              <div>
                <Link
                  to="/problems"
                  className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg hover:text-2xl"
                >
                  Problems
                </Link>
              </div>
            ) : null}
            {user ? (
              <div>
                <Link
                  to="/Leaderboard"
                  className="no-underline mx-4 text-[#F0F0F0] font-bold text-lg hover:text-2xl"
                >
                  Leaderboard
                </Link>
              </div>
            ) : null}
            <div className="relative hidden md:block">
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
                    className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg "
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* hamburger menu*/}
        {user ? (
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              onClick={handleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open Main menu</span>
              {open === true ? (
                <FaTimes className="w-4 h-4" />
              ) : (
                <FaBars className="w-4 h-4" />
              )}
            </button>
          </div>
        ) : (
          <div className="md:hidden">
            <Link
              to="/login"
              className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg "
            >
              Login
            </Link>
          </div>
        )}
      </div>
      {/* mobile menu*/}
      {open && user ? (
        <div className="md:hidden">
          <div className="ox-2 pt-1 pb-2  sm:px-3 flex-col text-center justify-center w-full bg-[#202020] ">
            {user && !userIsAdmin ? (
              <div className="">
                <Link
                  to="/"
                  className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg"
                >
                  Dashboard
                </Link>
              </div>
            ) : null}
            {userIsAdmin ? (
              <div className="mb-2">
                <Link
                  to="/addproblem"
                  className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg"
                >
                  Add a problem
                </Link>
              </div>
            ) : null}
            {userIsAdmin ? (
              user ? (
                <div className="">
                  <Link
                    to="/problems"
                    className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg"
                  >
                    Update/Delete problems
                  </Link>
                </div>
              ) : null
            ) : user ? (
              <div className="mt-2">
                <Link
                  to="/problems"
                  className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg "
                >
                  Problems
                </Link>
              </div>
            ) : null}
            {user ? (
              <div className="mt-2">
                <Link
                  to="/Leaderboard"
                  className="no-underline mx-2 text-[#F0F0F0] font-bold text-lg"
                >
                  Leaderboard
                </Link>
              </div>
            ) : null}
            {user ? (
              <div
                className="no-underline mx-4 my-2 text-[#F0F0F0] font-bold text-lg hover:text-xl"
                onClick={logoutHandler}
              >
                Sign Out
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
