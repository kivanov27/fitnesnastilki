import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { isAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'admin',
    host: '164.90.174.87',
    database: 'fitnesnastilkidb',
    password: process.env.DB_PASSWORD,
    port: 5432
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
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
    const result = await pool.query('SELECT * FROM product;');
    return res.status(200).json(result.rows);
}

async function handlePostProduct(req: NextApiRequest, res: NextApiResponse) {
    if (!(await isAdmin(req, res))) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const data = req.body;
    const newProduct = await prisma.product.create({ data });
    return res.status(201).json(newProduct);
}
