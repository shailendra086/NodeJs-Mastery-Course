import express from 'express';
import mongoose from 'mongoose';
import userRoute from './Routes/user.js';
import bodyParser from 'body-parser';
import contactRoute from './Routes/contact.js';

const app = express();
const PORT = 3000;
//app.use(express.json());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/contactApi').then(()=>{
    console.log('MongoDB connected successfully');
}).catch((err)=>{
    console.log('MongoDB connection failed',err);
});


app.use('/api/user',userRoute);
app.use('/api/contact',contactRoute);



app.get('/',(req,res)=>{
    return res.send('Hello World!');
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
} );