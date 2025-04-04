import { Cart } from "../Models/Cart.js";



export const addToCart = async (req, res) => {
    const { productId, title, price, quantity } = req.body;
    const userId = req.user;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex((item) =>
        item.productId.toString() == productId
    )
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price += price * quantity;
    }
    else {
        cart.items.push({ productId, title, price, quantity });
    }
    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart, success: true });
}


// Get cart items of the user
export const getUserCart = async (req, res) => {
    const userId = req.user;
    try {

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }
        // Populate the product details in the cart items
        return res.status(200).json({ message: "Cart found", cart, success: true });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }

};


//remove Product from cart

export const removeProductFromCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user;
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }
        cart.items = cart.items.filter((item) => 
            item.productId.toString() !== productId
        );
        await cart.save();
        return res.status(200).json({ message: "Product removed from cart", cart, success: true });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}


//clear Cart 

export const clearCart = async (req, res) => {
    try{
        const userId = req.user;
        let cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }
        cart.items = [];
        await cart.save();
        return res.status(200).json({ message: "Cart cleared successfully", cart, success: true });

    }catch(err){
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};


//Decrease the quantity of the product in the cart
export const decreaseProductQuantity = async (req, res) => {
    try{
        
        const { productId,quantity } = req.body;
        const userId = req.user;
    
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        const itemIndex = cart.items.findIndex((item) =>
            item.productId.toString() == productId
        )
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            if(item.quantity>quantity){
                const pricePerUnit = item.price / item.quantity;
              
                item.quantity -=quantity;
                item.price -= pricePerUnit * quantity;
            }else{
                cart.items.splice(itemIndex, 1);
            }
        }
        else {
            return res.status(404).json({ message: "Item not found in cart", success: false });
        }
        await cart.save();
        return res.status(200).json({ message: "Item Remove to the cart", cart, success: true });

    }catch(err){
        return res.status(500).json({ message: "Internal server error", success: false });
    }

}