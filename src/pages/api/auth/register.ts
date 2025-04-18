import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { email, password, phone, address, city, firstName, lastName } =
            await req.body;

        if (!email || !password || !phone || !address || !city) {
            return res.status(400).json({
                error: "Email, password, phone and address are required.",
            });
        }

        // Check if user with this email exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ error: "Email already in use" });
        }

        // Create new user
        const hashedPassword = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                phone,
                address,
                city,
                firstName,
                lastName,
            },
        });
        const { password: _, ...userWithoutPassword } = newUser;

        return res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
        console.error("Registration error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
