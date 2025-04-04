import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import {User} from '../Models/User.js';
config({path:'./config.env'});

export const isAuth = async(req,res,next)=>{
    const token = req.header('Auth');

    if(!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    // Check if the token is expired
    console.log("decode value is " , decoded);
    const id = decoded.id;
    console.log("decode value is " , decoded);
    let user = await User.findById(id);
    console.log("user value is " , user);
    if(!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
}
