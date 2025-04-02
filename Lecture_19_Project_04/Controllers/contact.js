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
    const contact = await Contact.create(
        {
            name,email,phone,type,user:req.user
        }
        );
    return res.status(200).json({
        success : true,
        message : "Contact created successfully",
        data : contact,
    })
}


//get contact by id
export const getContactById = async(req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            success : false,
            message : "Please provide contact id",
        })
    }
    //check if contact exists
    const getContactDetails = await Contact.findById({user:id});
    if(!getContactDetails){
        return res.status(400).json({
            success : false,
            message : "Contact does not exist",
        })
    }
    //get contact
    res.status(200).json({
        success : true,
        message : "Contact fetched successfully",
        data : getContactDetails,
    })
}



//update contact
export const updateContact = async (req,res)=>{
    const {id} = req.params;
    const {name,email,phone,type} = req.body;
    if(!id){
        return res.status(400).json({
            success : false,
            message : "Please provide contact id",
        })
    }
    //check if contact exists
    const existingContact = await Contact.findById(id);
    if(!existingContact){
        return res.status(400).json({
            success : false,
            message : "Contact does not exist",
        })
    }
    //update contact
    const updatedContact = await Contact.findByIdAndUpdate(id,{name,email,phone,type},{new:true});
    return res.status(200).json({
        success : true,
        message : "Contact updated successfully",
        data : updatedContact,
    })
}


//delete contact by id 
export const deleteContact = async (req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            success : false,
            message : "Please provide contact id",
        });

    }
    //check if contact exists
    const findContact = await Contact.findById(id);
    if(!findContact){
        return res.status(400).json({
            success : false,
            message : "Contact does not exist",
        })
    }
    //delete contact
    await Contact.findByIdAndDelete(id);
    return res.status(200).json({
        success : true,
        message : "Contact deleted successfully",
    })
}

//get contact by user id
export const getContactByUserId = async (req,res)=>{
    const {id}= req.params;

    if(!id){
        return res.status(400).json({
            success : false,
            message : "Please provide user id",
        })
    }
    //check if user exists
    const response = await Contact.find({user:id});
    if(!response){
        return res.status(400).json({
            success : false,
            message : "User does not exist",
        })
    }
    //get contact
    return res.status(200).json({
        success : true,
        message : "Contact fetched successfully",
        data : response,
    })
};
