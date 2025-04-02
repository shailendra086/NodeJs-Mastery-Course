import {Contact} from "../Models/Contact.js";


//get contact 
export const getContact = async(req,res)=>{
    const contacts = await Contact.find({});
    return res.status(200).json({
        success : true,
        message : "Contact fetched successfully",
        data : contacts,
    })
}

export const createContact = async(req,res)=>{
    const {name,email,phone,type} = req.body;
    if(!name || !email || !phone || !type){
        return res.status(400).json({
            success : false,
            message : "Please fill all the fields",
        })
    }
    //check if contact already exists
    const existingContact = await Contact.findOne({email,phone,});
    if(existingContact){
        return res.status(400).json({
            success : false,
            message : "Contact already exists",
        })
    }
    //create new contact
    const contact = await Contact.create({name,email,phone,type});
    return res.status(200).json({
        success : true,
        message : "Contact created successfully",
        data : contact,
    })
}