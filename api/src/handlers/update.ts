import { Update } from "@prisma/client";
import { Response } from "express";
import prisma from "../db";

export const getUpdates = async (req: any, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true,
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [] as Update[]);

    res.json({ data: updates })
};

export const getOneUpdate = async (req: any, res: Response) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    if (!update) {
        res.status(404);
        res.json({ message: `No Update found with id ${req.params.id}` });

        return;
    }

    res.json({ data: update })
};

export const createUpdate = async (req: any, res: Response) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    });

    if (!product) {
        res.status(400);

        //does not belong to the user
        return res.json({ message: 'Unallowed update' });
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: { id: product.id } }
        }
    });

    res.json({ data: update });
}

export const updateUpdate = async (req: any, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true,
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [] as Update[]);

    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        return res.json({ message: "Could not find an update for the specified product" })
    }

    const updated = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });

    res.json({ data: updated });
};

export const deleteUpdate = async (req: any, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true,
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [] as Update[]);

    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        return res.json({ message: "Could not find an update for the specified product" })
    }

    await prisma.update.delete({
        where: {
            id: match.id
        }
    });

    res.status(204);
}