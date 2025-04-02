import {User} from "../Models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register =  async(req,res)=>{
    const {name , email,password ,} = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({
            success : false,
            message : "Please fill all the fields",
        });
    }
    //check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success : false,
            message: "User already exists",
        });
    }
    const hashPassword = await bcrypt.hash(password,10);
    //create new user
    let user= await User.create({name,email,password:hashPassword});
      return res.status(200).json({
        success : true,
        message: "User registered successfully",
        data : user
    });
}


export const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json ({
            success : false ,
            message : "Please fill all the fields",
        })
    }
    //check if user exists or not 
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success : false,
            message : "User does not exist",
        })
    }
    //check password
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            success : false,
            message : "Paassword is incorrect",
        })
    }
    //create token
    const token = jwt.sign({user:user._id},'shailendra',{expiresIn:'1d'});
    return res.status(200).json({
        success : true,
        message : "Login successfully",
        token : token,
        data : `${user.name} is logged in`,
    })
}