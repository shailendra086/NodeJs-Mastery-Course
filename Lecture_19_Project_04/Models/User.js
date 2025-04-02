import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
       
    },
    email:{
        type : String,
        required : true,
        unique : true,
        
    },
    password:{
        type : String,
        required : true,
    },
    createdAt:{
        type : Date,
        default : Date.now(),
    },
    updatedAt:{
        type : Date,
        default : Date.now(),
    },
    Contacts:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Contact',
    }],

})

export const User = mongoose.model("User", userSchema);