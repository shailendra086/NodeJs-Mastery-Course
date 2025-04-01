import express from 'express';

const app = express();


const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`Hello World`);
})

app.post('/samplePost', (req, res) => {
    res.send(`Hello from post`);
})

app.put('/samplePut', (req, res) => {
    res.send(`Hello from put`);
})
app.delete('/sampleDelete', (req, res) => {
    res.send(`Hello from delete`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})