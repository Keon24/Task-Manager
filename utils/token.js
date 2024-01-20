import jwt from "jsonwebtoken";
import { config } from 'dotenv';

config(); 

const Access_Token_Secret = process.env.Access_Token_Secret;

const createAccessToken = (payload) => {
  return jwt.sign(payload, Access_Token_Secret);
};

export default {
  createAccessToken,
};
