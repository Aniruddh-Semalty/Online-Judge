import { useEffect } from "react";
import useAuthentication from "../../utils/hooks/useAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { getRole, login } from "../../utils/Store/userSlice";
import UserHome from "./UserHome";
import UnknownHome from "./UnknownHome";
const Home=()=>{
    const user=useSelector((store)=>store.user.userData);
    const dispatch=useDispatch();
    useEffect(()=>{
        useAuthentication().then((data)=>{
            dispatch(login(data.userName));
            dispatch(getRole(data.isAdmin))
        })
       
       
    },[]);
   
    return user?(<UserHome/>):(<UnknownHome/>)
}
export default Home;