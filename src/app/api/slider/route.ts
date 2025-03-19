import { NextResponse } from "next/server";
import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'admin',
    host: '164.90.174.87',
    database: 'fitnesnastilkidb',
    password: process.env.DB_PASSWORD,
    port: 5432
});

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM slider;');
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching slider data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
