import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        switch (req.method) {
            case "GET":
                return await handleGetCartItems(req, res);
            case "POST":
                return await handlePostCartItems(req, res);
            case "DELETE":
                if (req.body?.productId) {
                    return await handleDeleteCartItems(req, res);
                } else {
                    return await handleClearCart(req, res);
                }
            case "PATCH":
                return await handleUpdateQuantity(req, res);
            default:
                res.setHeader("Allow", ["GET", "POST", "DELETE"]);
                return res
                    .status(405)
                    .json({ error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error("Cart API error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleGetCartItems(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });

    const userId = session.user.id;

    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true },
    });

    const formattedCartItems = cartItems.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        image: i.product.image1,
        quantity: i.quantity,
    }));

    res.status(200).json(formattedCartItems);
}

async function handlePostCartItems(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });

    const { productId, quantity } = req.body;
    const userId = session.user.id;

    const existing = await prisma.cartItem.findFirst({
        where: { userId, productId },
    });

    if (existing) {
        await prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + quantity },
        });
    } else {
        await prisma.cartItem.create({ data: { userId, productId, quantity } });
    }

    res.status(200).json({ success: true });
}

async function handleDeleteCartItems(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });

    const { productId } = req.body;
    const userId = session.user.id;

    await prisma.cartItem.deleteMany({
        where: { userId, productId },
    });

    return res.status(200).json({ success: true });
}

async function handleClearCart(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });

    const userId = session.user.id;

    await prisma.cartItem.deleteMany({ where: { userId } });

    return res.status(200).json({ success: true });
}

async function handleUpdateQuantity(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });

    const { productId, quantity } = req.body;
    const userId = session.user.id;

    await prisma.cartItem.updateMany({
        where: { userId, productId },
        data: { quantity },
    });

    return res.status(200).json({ success: true });
}
