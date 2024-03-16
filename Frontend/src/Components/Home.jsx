import { useEffect } from "react";
import useAuthentication from "../../utils/hooks/useAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../utils/Store/userSlice";
const Home=()=>{
    const user=useSelector((store)=>store.user.userData);
    const dispath=useDispatch();
    useEffect(()=>{
        useAuthentication().then((data)=>{
            dispath(login(data));
        })
       
       
    },[]);
   
    return user?(<div className="text-purple-950"><h1>Home page</h1></div>):<div className="font-bold text-3xl p-6">Please login to see home page</div>
}
export default Home;