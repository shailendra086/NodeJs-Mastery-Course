import express from 'express';
import { isAuth } from '../Middlewares/Auth.js';
import { addToCart, getUserCart, removeProductFromCart ,clearCart,decreaseProductQuantity} from '../Controllers/cart.js';

const router = express.Router();
//add to cart
// /api/cart/add
router.post('/add', isAuth, addToCart);

//get cart items of user
// /api/cart/getuserCart
router.get('/getuserCart', isAuth, getUserCart);

//remove product from cart
// /api/cart/remove/:productId
router.delete('/remove/:productId', isAuth, removeProductFromCart);

//clear cart of the user
// /api/cart/clear
router.delete('/clear',isAuth, clearCart);

//decrease quantity of product in cart
// /api/cart/decrease/:productId
router.post('/decrease/--qty',isAuth, decreaseProductQuantity);

export default router;