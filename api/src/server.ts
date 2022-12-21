import express from 'express';
import router from './router';

const app = express();

app.get('/', (req, res) => {
    console.log('Executing root endpoint');
    res.status(200);
    res.json({ message: 'Hello express product logs API is working' });
});

app.use('/api', router);

export default app;