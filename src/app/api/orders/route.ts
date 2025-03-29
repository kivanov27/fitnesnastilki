import { NextResponse } from "next/server";
import { CartItem } from "@/types";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET() {
    try {
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const orders = await prisma.orders.findMany({
            include: { order_items: true },
            orderBy: { created_at: "desc" },
        });

        return NextResponse.json(orders, { status: 200 });
    } 
    catch (error) {
        console.error("Error fetching orders: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { 
            customer_name,
            customer_surname,
            customer_email,
            customer_phone,
            customer_address,
            total_price,
            order_items
        } = body;

        if (!customer_name || !customer_surname || !customer_email || !customer_phone || !customer_address || !total_price || !order_items.length) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const newOrder = await prisma.orders.create({
            data: {
                customer_name,
                customer_surname,
                customer_email,
                customer_phone,
                customer_address,
                total_price,
                status: "Pending",
                order_items: {
                    create: order_items.map((item: CartItem) => ({
                        product_id: item.id,
                        product_name: item.name,
                        price: item.price / item.quantity,
                        quantity: item.quantity,
                        subtotal: item.price,
                    })),
                },
            },
            include: {
                order_items: true,
            },
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error("Error creating order: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
