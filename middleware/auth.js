import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { config } from 'dotenv';

config(); 

const Access_Token_Secret = process.env.Access_Token_Secret;

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice("Bearer ".length).trimLeft();
    }

    const verified = jwt.verify(token, Access_Token_Secret);
    const user = await User.findById(verified._id).select("-password");

    if (!user) {
      return res.status(403).send("Access Denied");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

