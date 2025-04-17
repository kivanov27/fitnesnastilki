import { NextApiRequest, NextApiResponse } from "next-auth/_next";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            email: string;
        };

        if (!decoded) {
            return res.status(400).json({ error: "Invalid token payload" });
        }

        const user = await prisma.user.findUnique({
            where: { email: decoded.email },
            select: {
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
                address: true,
            },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("User auth error: ", error);
        return res.status(401).json({ error: "Invalid token" });
    }
}
