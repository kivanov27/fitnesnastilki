import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

const pool = new Pool({
    user: "admin",
    host: "164.90.174.87",
    database: "fitnesnastilkidb",
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { link } = req.query;

    if (!link || Array.isArray(link)) {
        return res.status(400).json({ error: "Product link is required" });
    }

    try {
        switch (req.method) {
            case "GET":
                return handleGetProduct(link, res);
            case "DELETE":
                return handleDeleteProduct(link, req, res);
            default:
                res.setHeader("Allow", ["GET", "DELETE"]);
                return res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    }
    catch (error) {
        console.error("Error in product API", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleGetProduct(link: string, res: NextApiResponse) {
    try {
        const result = await pool.query("SELECT * FROM product WHERE link = $1;", [link]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error("Error fetching product: ", error);
        throw error;
    }
}

async function handleDeleteProduct(link: string, req: NextApiRequest, res: NextApiResponse) {
    if (!(await isAdmin(req, res))) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const product = await prisma.product.findFirst({ where: { link } });
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    await prisma.product.delete({ where: { id: product.id } });
    return res.status(200).json({ message: "Product deleted" });
}
