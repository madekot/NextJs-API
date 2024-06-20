import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/shared/lib/prisma';
import { Post } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'GET') {
        try {
            const posts: (Post & { user: { name: string } })[] = await prisma.post.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            const formattedPosts = posts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                author: post.user.name,
            }));

            res.status(200).json(formattedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Failed to fetch posts' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
