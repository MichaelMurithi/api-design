import bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { User } from '../types/user.types';

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
}

const secret = process.env.JWT_SECRET;

export const createJWT = (user: User) => {
    if (!secret) {
        throw new Error('JWT Secret could not be found from the environment');
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, secret
    )

    return token;
};

export const protect = (req: any, res: Response, next: NextFunction) => {
    if (!secret) {
        console.error('JWT Secret could not be found from the environment');
        res.status(500);
        res.json({ message: 'Server error' });
        return;
    }

    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json({ message: "Not authorized" });

        return;
    }

    const [, token] = bearer.split(' ');

    if (!token) {
        res.status(401);
        res.json({ message: "Invalid token" });

        return;
    }

    try {
        const user = jwt.verify(token, secret);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401);
        res.json({ message: "Invalid token" });

        return;
    }
}