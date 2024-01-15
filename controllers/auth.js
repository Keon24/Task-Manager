import bcrypt from 'bcrypt';

import  Jwt  from "jsonwebtoken";

import User from "../models/User.js"

export const register = async (req,res) => {
try {
    const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt); 

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
    });
    const savedUser = await newUser.save();
    res.stats(201).json(savedUser);
} catch (err) {
res.status(500).json({error: err .message});
}
}

/* LOGGING IN */
export const login = async (req,res) => {
    try{
     const [email, password] = req.body;
     const user = await User.findOne({email: email})
     if(!user) return res.status(400).json({msg: "User does not exist."})

     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) return res.status(400).json({msg: "Invailid crediemtals"})

     const token = jwt.sign({id: user.id}, process.env.JWT_SWCRET)
     delete user.password;
     res.status(200).json({token,user});

    }catch( err) {
        res.status(500).json({error: err .message});
    }
    
}