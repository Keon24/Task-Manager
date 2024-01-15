
import mongoose, { mongo } from "mongoose";
const UserSchema = new mongoose.Schema(
    {
      firstName: {
      type: String,
      required: "Please enter your first name",
      trim: true,
      minLength: 2,
      maxLength: 20,
      },
      lastName: {
      type: String,
      required: "Please enter your last name",
      trim: true,
      minLength: 2,
      maxLength: 20
      },
      email: {
        type: String,
        required: "Please enter your email",
        trim: true,
        unique: true 
      },
      password: {
        type: String,
        required: "Please enter a password",
        minLength: 5,
      },
      picturePath: {
         type: String,
         default: "",
      },
      resetToken: {
        type: String,
        default: null,
      },
      resetTokenExpiration: {
        type: Date,
        default: null,
      }
      
    }
);

export default mongoose.model("User", UserSchema);