import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || '34yt987hsad123';

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
