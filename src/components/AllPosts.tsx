import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Post } from '@prisma/client';

const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
};

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function AllUsersAllPosts() {
    const [currentStatus, setCurrentStatus] = useState<Status>('idle');

    const { data: posts, isLoading } = useQuery<(Post & { author: string })[]>('posts', fetchPosts, {
        refetchInterval: 5000,
        onSuccess: () => setCurrentStatus('success'),
        onError: () => setCurrentStatus('error'),
    });

    useEffect(() => {
        if (isLoading) {
            setCurrentStatus('loading');
        }
    }, [isLoading]);

    return (
        <div>
            <h1>All Users Posts</h1>
            {{
                idle: <p>idle...</p>,
                loading: <p>Loading...</p>,
                error: <p>Failed to fetch posts</p>,
                success: (
                    <ul>
                        {posts?.length && posts.map((post) => (
                            <li key={post.id} style={{ margin: '15px 0' }}>
                                <div>Author: {post.author}</div>
                                <div>Title: {post.title}</div>
                                <div>Content: {post.content}</div>
                            </li>
                        ))}
                    </ul>
                ),
            }[currentStatus]}
        </div>
    );
}
