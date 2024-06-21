const jwt = require('jsonwebtoken');
import { prisma } from '../../src/shared/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Post, User } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authorization;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user: User = await prisma.user.findUnique({ where: { id: decoded.userId } });

        const posts: Post[] = await prisma.post.findMany({
            where: {
                userId: user.id,
            },
        });

        res.status(200).json({ posts });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
