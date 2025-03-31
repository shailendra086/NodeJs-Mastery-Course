import express from 'express';
import ejs from 'ejs';
const app = express();
const port = 3000;

let products = [
    {name : "Shailendra",phone:"4567"},
    {name : "Shyam",phone:"387387"},
    {name : "Rohan",phone:"83763"},
    {name : "Mohan",phone:"2873"},
]


app.get('/',(req,res)=>{
    //res.send('Hello World!');
    //Here we are need the file path of the ejs file
    let name = "Ram"
    res.render('index.ejs',{name,products});

})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})