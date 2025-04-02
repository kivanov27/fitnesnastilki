import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

export function generateToken(user: user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '90d' }
    );
}

export async function comparePassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function isAdmin(req?: NextApiRequest, res?: NextApiResponse) {
    try {
        // For API routes (pages router)
        if (req && res) {
            const session = await getServerSession(req, res, authOptions);
            return session?.user?.isAdmin || false;
        }

        // For server components/actions (App Router)
        const session = await getSession();
        return session?.user?.isAdmin || false;
    }
    catch (error) {
        console.error("Admin check error: ", error);
        return false;
    }
}
