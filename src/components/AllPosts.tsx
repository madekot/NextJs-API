import { useState, useEffect } from 'react';
import { Post } from '@prisma/client';

export default function AllUsersAllPosts() {
    const [posts, setPosts] = useState<(Post & { author: string })[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/posts')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }
                return res.json();
            })
            .then((data) => {
                setPosts(data);
            })
            .catch(() => {
                setError('Failed to fetch posts');
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>All Users Posts</h1>
            <ul>
                {posts.length && posts.map((post) => (
                    <li key={post.id} style={{ margin: '15px 0' }}>
                        <div>Author: {post.author}</div>
                        <div>Title: {post.title}</div>
                        <div>Content: {post.content}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
