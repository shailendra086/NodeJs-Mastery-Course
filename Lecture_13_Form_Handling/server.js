import express from 'express';
import path from 'path';
import file from 'fs/promises';
const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));




const port = 3000;

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.post('/form-submit',(req,res)=>{
    console.log(req.body);
    // Save the data to a file
    const data = req.body;
   
    res.json({
        message: 'Data received successfully',
        data: req.body
    }) 
    // Log the data to the console
    console.log('Received data:', data);
})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});