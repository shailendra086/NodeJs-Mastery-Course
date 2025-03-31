import http from 'http';

const server = http.createServer((req,res)=>{
    console.log("Server is running...");
   res.end("You requrest a server");
});



const port = 3000;

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})