import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { protect } from './modules/auth/auth';
import router from './router';

const app = express();

app.use(cors());
app.use(morgan(('dev')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200);
    res.json({ message: 'Hello express product logs API is working' });
});

app.use('/api', protect, router);

export default app;