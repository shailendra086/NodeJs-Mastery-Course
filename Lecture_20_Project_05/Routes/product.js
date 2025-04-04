import express from 'express';
import { addProduct, getAllProducts ,getProductById,updateProductById,deleteProductById} from '../Controllers/product.js';

const router = express.Router();



//add product route
// POST /api/product/add
router.post('/add',addProduct);

//get all products route
// GET /api/product/all
router.get('/all',getAllProducts);

//get single product by id route
// GET /api/product/:id
router.get('/:id',getProductById);

//get single product by id route
// GET /api/product/:id

router.put('/:id',updateProductById);

//delete single product by id route
// DELETE /api/product/:id
router.delete('/:id',deleteProductById);



export default router;
