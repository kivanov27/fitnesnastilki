import { isAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Pool } from 'pg';
import prisma from "@/lib/prisma";

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
        const result = await pool.query('SELECT * FROM product;');
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await req.json();
    const newProduct = await prisma.product.create({ data });

    return NextResponse.json(newProduct, { status: 201 });
}
