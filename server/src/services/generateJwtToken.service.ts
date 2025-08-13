import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";
const { JWT_EXPIRES_IN, JWT_SECRET } = envConfig.JWT_Generate;
const generateJWTToken = (data: { id: string; instituteNumber?: string }) => {
  //@ts-ignore
  const token = jwt.sign(data, JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

export default generateJWTToken;
