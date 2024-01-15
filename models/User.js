
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
      name: {
      type: string,
      required: ["Please enter your name"],
      trim: true
      },
      email: {
        type:string,
        required: ["Please enter your email"],
        trim: true,
        unique: true 
      },
      
    }
)