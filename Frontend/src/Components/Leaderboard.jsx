import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRole, login } from "../../utils/Store/userSlice";
import useAuthentication from "../../utils/hooks/useAuthentication";
function Leaderboard() {
  const user=useSelector((store)=>store.user.userData);
  const [userData, setUserData] = useState([]);
  const dispatch=useDispatch();
  const getAllUsers = async () => {
    try {
      const allUsers = await axios.get("http://localhost:3000/leaderboard");
      const allUsersArr = allUsers.data.users;
      allUsersArr.sort((a, b) => b.problemsSolved.length - a.problemsSolved.length);
      setUserData(allUsersArr);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    useAuthentication().then((data)=>{
    
    dispatch(login(data.userName));
    dispatch(getRole(data.isAdmin));
    })
    getAllUsers();
  }, []);

  return  user?  (
    <div className="flex justify-center items-center my-10 ">
      <div className="flex-col  border w-1/2 p-6 bg-[#202020] text-white rounded-lg">
        <div className="flex justify-between text-xl font-bold p-6">
          <h1 className="w-1/4">Rank</h1>
          <h1 className="w-1/2">Username</h1>
          <div className="w-1/4 flex justify-center whitespace-nowrap">
            <h1>Problems solved</h1>
          </div>
        </div>
        {userData.map((user, index) => (
          <div key={index} className="flex justify-between border-b-2 border-white p-6 mb-10">
            <h1 className="w-1/4">{index + 1}</h1>
            <h1 className="w-1/2 font-semibold text-xl">{user.userName}</h1>
            <div className="w-1/4 flex justify-center">
              <h3 className="font-semibold text-xl">{user.problemsSolved.length}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) :<div className="font-bold text-3xl p-6">Please login to see Leaderboard</div>
}

export default Leaderboard;
