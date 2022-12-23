import { Response } from "express";
import prisma from "../db";

export const getProducts = async (req: any, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    if (!user) {
        res.status(404);
        res.json({ message: "Products not found" });

        return;
    }

    res.json({ data: user.products })
};

export const getOne = async (req: any, res: Response) => {
    const id = req.params.id;

    const product = prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    if (!product) {
        res.status(404);
        res.json({ message: `No product found with id ${req.params.id}` });

        return;
    }

    res.json({ data: product })
};

export const createProduct = async (req: any, res: Response) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    });

    res.json({ data: product });
}

export const updateProduct = async (req: any, res: Response) => {
    const updated = await prisma.product.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name
        }
    });

    res.json({ data: updated });
};

export const deleteProduct = async (req: any, res: Response) => {
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: deleted });
}