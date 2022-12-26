import cors from 'cors';
import express, { NextFunction, Response } from 'express';
import morgan from 'morgan';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

const app = express();

app.use(cors());
app.use(morgan(('dev')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.json({ message: "Hello" });
});

app.use('/api', protect, router);

app.post('/signup', createNewUser);
app.post('/signin', signin);

app.use((err: any, req: any, res: Response, next: NextFunction) => {
    if (err.type === 'auth') {
        res.status(401)
            .json({ message: 'Unauthorized' });
    } else if (err.type === 'input') {
        res.status(400)
            .json({ message: 'Invalid input' });
    } else {
        res.status(500)
            .json({ message: "Server error" });
    }
});

export default app;