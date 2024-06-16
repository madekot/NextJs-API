import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error('JWT secret not defined');
        return res.status(500).json({ error: 'Internal server error' });
    }

    try {
        const decoded = jwt.verify(authorization, jwtSecret) as { userId: string };

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.method === 'POST') {
            const { title, content } = req.body;

            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    user: {
                        connect: { id: user.id },
                    },
                },
            });

            return res.status(201).json(newPost);
        }

        return res.status(405).json({ error: 'Method Not Allowed' });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
