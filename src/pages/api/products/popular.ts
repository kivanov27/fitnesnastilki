import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

// Create a PostgreSQL connection pool
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
            .json({ error: `Method ${req.method} not allowed` });
    }
    try {
        const result = await pool.query(
            "SELECT * FROM product WHERE popular = TRUE ORDER BY id ASC;",
        );
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching popular products:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
