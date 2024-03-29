import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            }
        });
        const token = createJWT(user);
        res.json({ token })
    } catch (error: any) {
        error.type = 'input';
        next(error);
    }
}

export const signin = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    if (!user) {
        res.status(404);
        res.json({ message: "Invalid user" });

        return;
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        res.status(401);
        res.json({ message: "Invalid username/password" });

        return;
    }

    const token = createJWT(user);
    res.json({ token })
}