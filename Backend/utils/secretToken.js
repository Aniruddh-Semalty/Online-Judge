import dotenv from "dotenv"
import jwt from "jsonwebtoken";
dotenv.config();

const createSecretJwtToken=async(id,username)=>{
    return await jwt.sign({id,username},process.env.JWT_SECRET,{
        expiresIn:15*24*60*60
    })
}

export default createSecretJwtToken;