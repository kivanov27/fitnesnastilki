import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { hashPassword } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import prisma from "@/lib/prisma"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const session = await getServerSession(req, res, authOptions);
        const { email, currentPassword, newPassword } = req.body;

        // Verify session
        if (!session?.user) {
            return res.status(401).json({ message: 'Неоторизиран достъп' });
        }

        // Verify email matches session
        if (session.user.email !== email) {
            return res.status(403).json({ message: 'Нямате права за тази операция' });
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            return res.status(404).json({ message: 'Потребител не е намерен' });
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Грешна текуща парола' });
        }

        // Hash new password
        const hashedPassword = await hashPassword(newPassword);

        // Update password
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        return res.status(200).json({ message: 'Паролата е сменена успешно' });
    } catch (error) {
        console.error('Password change error:', error);
        return res.status(500).json({ message: 'Грешка в сървъра' });
    }
}
