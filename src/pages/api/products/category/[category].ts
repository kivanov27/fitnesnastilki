import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
    user: "admin",
    host: "164.90.174.87",
    database: "fitnesnastilkidb",
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

    const { category } = req.query;

    if (!category || Array.isArray(category)) {
        return res.status(400).json({ error: "Category is required" });
    }

    try {
        const result = await pool.query("SELECT * FROM product WHERE $1 = ANY(category) ORDER BY id ASC;", [category]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Products in category ${category} not found` });
        }
        return res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error fetching products by category :", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
