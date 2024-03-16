import axios from "axios";
import Cookies from 'js-cookie';

const useAuthentication=async()=>{
  
    const token=Cookies.get("token");
    const response=await axios.post("http://localhost:3000/authentication",{
        token,
    });
  return (response.data.user.userName);
   

}
export default useAuthentication;