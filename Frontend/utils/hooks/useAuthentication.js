import axios from "axios";
import Cookies from "js-cookie";

const useAuthentication = async () => {
  const token = Cookies.get("token");
  const response = await axios.post(
    `${import.meta.env.VITE_API_PORT}authentication`,
    {
      token,
    }
  );
  const userName = response.data.user.userName;
  const isAdmin = response.data.user.isAdmin;

  return { userName, isAdmin };
};
export default useAuthentication;
