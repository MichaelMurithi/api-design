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
    setTimeout(() => {
        next(new Error("Something crazy happened"));
    }, 1);
});

app.use('/api', protect, router);

app.post('/signup', createNewUser);
app.post('/signin', signin);

app.use((err: Error, req: any, res: Response, next: NextFunction) => {
    console.log(err);
    res.json({ message: "There was an error" });
});

export default app;