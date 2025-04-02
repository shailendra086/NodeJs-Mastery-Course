import jwt from 'jsonwebtoken';
import { User } from '../Models/user.js';
export const isAuthenticated = async(req,res,next)=>{
    const token = req.header('auth');

    console.log("checking token : ",token);

    if(!token){
        return res.status(401).json({
            success : false,
            message : "Please login First",
        })
    };
    //verify token
    const decoded = jwt.verify(token, 'shailendra');
    //console.log("decoded token data: ",decoded);
    console.log("decoded token data: ",decoded);
    const id = decoded.user;
    let user = await User.findById(id);
    if(!user){
        return res.status(401).json({
            success : false,
            message : "User does not found",
        })
    }
    req.user = user;
    next();
};
