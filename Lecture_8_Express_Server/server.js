import express from 'express';


const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    res.send(`<h1>Hello World</h1>`);
})

app.get('/srk',(req,res)=>{
    res.send(`<h1>Shahrukh Khan</h1>`);
})

app.get('/shailendra',(req,res)=>{
    res.send(`<h1>Shailendra Sahani Route</h1>`);

})
app.listen(PORT, () => 
    console.log(`Server is running on http://localhost:${PORT}`)
);