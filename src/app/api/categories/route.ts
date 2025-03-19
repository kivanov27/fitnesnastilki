import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    user: "admin",
    host: "164.90.174.87",
    database: "fitnesnastilkidb",
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export async function GET() {
    try {
        const result = await pool.query("SELECT * FROM categories;");
        return NextResponse.json(result.rows, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching popular categories:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
