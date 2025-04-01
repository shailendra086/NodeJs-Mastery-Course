import http from 'http';


const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/') {
        res.end('<h1>Welcome to the Home Page</h1>');

    } else if (req.url === '/about') {
        res.end('<h1>Welcome to the About Page</h1>');

    }
    else if (req.url === '/contact') {
        res.end('<h1>Welcome to the Contact Page</h1>');

    }
    else res.end('<h1>404 Page Not Found</h1>');
});






server.listen(3000, () => {
    console.log("Server is running on port 3000")
})