import dotenv from "dotenv";
import User from "../Models/user.model.js";
dotenv.config();
import jwt from "jsonwebtoken"


const isAuthenticated=async(token)=>{
    try {
        // Extract token from cookies or headers
          if (!token) {
          return null
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
      
        const user = await User.findById(decoded.id);
       
        if (!user) {
          return null;
        }
        else
        {
          return user;
        }
        
      } catch (error) {
        console.error(error);
        return null;
      }
    

}
export default isAuthenticated;