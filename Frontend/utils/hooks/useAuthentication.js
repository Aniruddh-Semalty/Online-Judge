import axios from "axios";
import Cookies from 'js-cookie';

const useAuthentication=async()=>{
  
    const token=Cookies.get("token");
    const response=await axios.post("http://localhost:3000/authentication",{
        token,
    });
    const userName=response.data.user.userName;
    const isAdmin=response.data.user.isAdmin;
   
  return ({userName,isAdmin});
   

}
export default useAuthentication;