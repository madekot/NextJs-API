import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/shared/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            await prisma.post.deleteMany({});
            await prisma.user.deleteMany({});
            res.status(200).json({ message: 'All users and their posts deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete users and posts' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}