import { Product } from "../Models/Product.js";


//add product

export const addProduct = async (req, res) => {
    try {
        let product = await Product.create(req.body);
        // Check if product is created successfully
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not created"
            })
        }
        // Check if product is created successfully
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//get all products

export const getAllProducts = async (req, res) => {
    try {
        let products = await Product.find();
        // Check if products are found
        if (!products) {
            return res.status(400).json({
                success: false,
                message: "Products not found"
            })
        }
        // Check if products are found
        return res.status(200).json({
            success: true,
            message: "Products found successfully",
            data: products
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message

        })
    }
}

//get single product by id

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findById(id);
        // Check if product is found
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }
        // Check if product is found
        return res.status(200).json({
            success: true,
            message: "Product found successfully",
            data: product
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message

        })
    }
}


//update product by id

export const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findByIdAndUpdate(id,req.body,{new:true});
        // Check if product is found
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found or invalid Id"
            })
        }
        // Check if product is found
        return res.status(200).json({
            success: true,
            message: "Product found successfully and updated",
            data: product
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message

        })

    }
}


//delete product by id
export const deleteProductById = async (req, res) => {
    try{
        const id = req.params.id;
        let product = await Product.findByIdAndDelete(id);
        // Check if product is found
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found or invalid Id"
            })
        }
        // Check if product is found
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message

        })
    }
}