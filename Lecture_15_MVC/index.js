import express from 'express';
import mongoose from 'mongoose';
import {User} from './Models/User.js';

const app = express();
const PORT = 3000;
app.use(express.urlencoded({extended:true}));
mongoose.connect('demourlreplace this',).then(() => {
    console.log('Connected to MongoDB');

}).catch((err) => { 
    console.error('Error connecting to MongoDB:', err);
});

app.get('/',(req,res)=>{
    res.render('index.ejs');
})


//app.use(express.json());
app.post('/fsubmit',async(req,res)=>{
    
    
    try{
        const data = req.body;
       const response = await User.create(data);
        res.json({
            message: 'User created successfully',
            data: response
        })

        console.log(data);
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
   
    

    
})





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}  );









