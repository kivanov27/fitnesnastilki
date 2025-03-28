import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, password, phone, address, firstName, lastName } = await req.json();

        if (!email || !password || !phone || !address) {
            return NextResponse.json({ error: "Email, password, phone and address are required." }, { status: 400 });
        }

        // Check if user with this email exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        // Create new user
        const hashedPassword = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                phone,
                address,
                firstName,
                lastName
            }
        });

        // Generate token
        const token = generateToken(newUser);
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({ user: userWithoutPassword, token }, { status: 201 });
    } 
    catch (error) {
        console.error("Registration error: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
