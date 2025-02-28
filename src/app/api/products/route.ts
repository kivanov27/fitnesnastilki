import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'admin',
    host: '164.90.174.87',
    database: 'fitnesnastilkidb',
    password: '84iyu24eh0t5o9',
    port: 5432
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await pool.query('SELECT * FROM product');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
