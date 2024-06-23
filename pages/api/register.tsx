import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/shared/lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await prisma.user.create({
                data: { name, email, password: hashedPassword },
            });
            res.status(201).json({ message: 'User registered' });
        } catch (error) {
            res.status(400).json({ error: 'User already exists' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
