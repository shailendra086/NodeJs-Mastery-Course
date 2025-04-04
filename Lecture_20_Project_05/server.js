import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
const app = express();
const PORT = 3000;
//app.use(express.json());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/ecommerce').then(()=>{
    console.log('MongoDB connected successfully');
}).catch((err)=>{
    console.log('MongoDB connection failed',err);
});


// Import Routes
app.use('/api/user',userRouter);

//product routes
app.use('/api/product',productRouter);

//cart routes
app.use('/api/cart',cartRouter);


app.get('/',(req,res)=>{
    return res.send('This is the Home Page of the E-commerce API');
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
} );