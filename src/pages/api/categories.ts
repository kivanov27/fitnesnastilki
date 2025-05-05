import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
    user: "admin",
    host: process.env.HOST,
    database: "fitnesnastilkidb",
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res
            .status(405)
            .json({ error: `Method ${req.method} is not allowed` });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM categories ORDER BY id ASC;",
        );
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching popular categories:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
