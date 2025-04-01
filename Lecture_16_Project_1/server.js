import express from 'express';
import mongoose from 'mongoose';
import {shorturl,getOriginalUrl} from './Controllers/url.js';
const app = express();

const PORT =  3000;
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/urlshortner').then(()=>{
    console.log('Connected to MongoDB');
}
).catch((err) => {  
    console.error('Error connecting to MongoDB:', err);
});

//Rendering the Ejs Files
app.get('/',(req,res)=>{
    res.render('index.ejs',{shortUrl : null});
})
//short url logic


app.post('/short',shorturl);

//Redirecting to the Original url dynamic route
app.get('/:shortCode',getOriginalUrl);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});