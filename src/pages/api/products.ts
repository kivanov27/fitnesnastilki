import { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                if (req.query.q) {
                    return await handleGetSearchProducts(req, res);
                }
                return await handleGetProducts(res);
            case "POST":
                return await handlePostProduct(req, res);
            default:
                res.setHeader("Allow", ["GET", "POST"]);
                return res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    }
    catch (error) {
        console.error("Products API error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleGetProducts(res: NextApiResponse) {
    const products = await prisma.product.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return res.status(200).json(products);
}

async function handleGetSearchProducts(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = req.query.q as string;
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive",
                },
            },
        });
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

async function handlePostProduct(req: NextApiRequest, res: NextApiResponse) {
    if (!(await isAdmin(req, res))) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    try {
        const data = req.body;
        const newProduct = await prisma.product.create({ data });
        return res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Create product error: ", error);
        return res.status(400).json({ error: "Failed to create product" });
    }
}
