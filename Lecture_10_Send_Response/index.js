import express from 'express';
import path from 'path';

const app = express();

const port = 3000;
const product = [
    {title:"iphone",price:"1000",},
    {title:"samsung",price:"1000",},
    {title:"iphone",price:"1000",},
    
]

//send Response
app.get('/',(req,res)=>{
    // res.json({
    //     message : "Hello World",
    //     status : 200,
    //     data:product,
    //     success : true,
    // });
    // res.send(`<h1>Hello World</h1>
    // <p>This is my first express server</p>`)
    const dir =path.resolve();
    console.log("mypath",dir);
    const url = path.join(dir,'./index.html');
    
    res.sendFile(url);
})


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})