import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//user Register
export const register = async (req, res) => {

    const { name, email, password } = req.body;
    // Check if user
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    let createUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    // Check if user is created successfully
    return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: createUser,
    });

}


//user Login 
export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User does not exist",
        });
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Enter the correct password",
        });
    }
    // Generate JWT token
    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });
    console.log("token value is " , token);
    // Login successful
    return res.status(200).json({
        success: true,
        message: `Welcome back ${user.name}`,
        token: token,
        data: user,
    });
}