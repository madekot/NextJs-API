import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { userId } = req.query;

    if (req.method === 'GET') {
        try {
            const posts = await prisma.post.findMany({
                where: {
                    userId: parseInt(userId as string),
                }
            });

            res.status(200).json(posts);
        } catch (error) {
            console.error('Error fetching user posts:', error);
            res.status(500).json({ error: 'Failed to fetch user posts' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}