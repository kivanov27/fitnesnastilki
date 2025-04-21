import { NextApiRequest, NextApiResponse } from "next";
import { NewOrderItem } from "@/types";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        switch (req.method) {
            case "GET":
                return await handleGetOrders(req, res);
            case "POST":
                return await handlePostOrder(req, res);
            default:
                res.setHeader("Allow", ["GET", "POST"]);
                return res
                    .status(405)
                    .json({ error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error("Orders API error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleGetOrders(req: NextApiRequest, res: NextApiResponse) {
    if (!(await isAdmin(req, res))) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const orders = await prisma.orders.findMany({
        include: { order_items: true },
        orderBy: { created_at: "desc" },
    });

    return res.status(200).json(orders);
}

async function handlePostOrder(req: NextApiRequest, res: NextApiResponse) {
    const {
        customer_name,
        customer_surname,
        customer_email,
        customer_phone,
        customer_address,
        customer_city,
        total_price,
        order_items,
    } = req.body;

    if (
        !customer_name ||
        !customer_surname ||
        !customer_email ||
        !customer_phone ||
        !customer_address ||
        !customer_city ||
        !total_price ||
        !order_items.length
    ) {
        return res
            .status(400)
            .json({ error: "Поръчката не може да бъде извършена" });
    }

    const newOrder = await prisma.orders.create({
        data: {
            customer_name,
            customer_surname,
            customer_email,
            customer_phone,
            customer_address,
            customer_city,
            total_price,
            status: "Pending",
            order_items: {
                create: order_items.map((item: NewOrderItem) => ({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    price: item.price,
                    quantity: item.quantity,
                    subtotal: item.subtotal,
                })),
            },
        },
        include: {
            order_items: true,
        },
    });

    return res.status(201).json(newOrder);
}
