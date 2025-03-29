import { NextResponse } from "next/server";
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

export async function GET(_req: Request, { params }: { params: { link: string } }) {
    const { link } = await params;

    if (!link) {
        return NextResponse.json({ error: "Product link is required" }, { status: 400 });
    }

    try {
        const result = await pool.query("SELECT * FROM product WHERE link = $1;", [link]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(result.rows[0], { status: 200 });
    }
    catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: { link: string } }) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const product = await prisma.product.findFirst({ where: { link: params.link } });
    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id: product.id } });
    return NextResponse.json({ message: "Product deleted" });
}
