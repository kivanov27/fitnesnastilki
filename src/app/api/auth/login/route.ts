import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const token = generateToken(user);
        const { password: _, ...userWithoutPassword } = user;
        
        return NextResponse.json({ user: userWithoutPassword, token });
    }
    catch (error) {
        console.error("Login error: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
