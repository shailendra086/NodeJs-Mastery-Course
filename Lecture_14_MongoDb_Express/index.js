import express from 'express';
import mongoose from 'mongoose';    


const app=express();
const PORT=3000;
const url = "mongodb+srv://shailendra10020:6uRh4x3an2Vtgdkq@cluster0.nn4oa.mongodb.net/FileUploadDB";
mongoose.connect(url,).then(()=>{
    console.log('MongoDB connected successfully');

}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
})

// Middleware to parse JSON request body
app.use(express.json());
// Middleware to parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));



app.get('/',(req,res)=>{
    res.send('Hello World!');
});





app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}  );