import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    user: "admin",
    host: "164.90.174.87",
    database: "fitnesnastilkidb",
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export async function GET(_req: Request, { params }: { params: { category: string } }) {
    const { category } = await params;

    if (!category) {
        return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    try {
        const result = await pool.query("SELECT * FROM product WHERE $1 = ANY(category);", [category]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: `Products in category ${category} not found` }, { status: 404 });
        }

        return NextResponse.json(result.rows, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
