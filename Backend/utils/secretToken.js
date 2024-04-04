import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const createSecretJwtToken = async (id, username, isAdmin) => {
  try {
    return await jwt.sign({ id, username, isAdmin }, process.env.JWT_SECRET, {
      expiresIn: 15 * 24 * 60 * 60,
    });
  } catch (e) {
    console.log(e);
  }
};

export default createSecretJwtToken;
