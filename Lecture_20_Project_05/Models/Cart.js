import mongoose from "mongoose";
import {Product} from "../Models/Product.js";
import {User} from "../Models/User.js";
const cartItemSchema = new mongoose.Schema({

    productId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },



});


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [cartItemSchema],
    
}, { timestamps: true });


export const Cart = mongoose.model("Cart", cartSchema);