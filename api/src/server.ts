import express from 'express';

const app = express();

app.get('/', (req, res) => {
    console.log('Executing root endpoint');
    res.status(200);
    res.json({ message: 'Hello from express API' });
});

export default app;