import { LayoutVariant } from '@/const';
import { withLayout } from '@/hocs';
import { useEffect, useState } from 'react';
import { Post } from '@prisma/client';

const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found');
        throw new Error('No token found');
    }

    try {
        const response = await fetch('/api/protected', {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch protected data');
        }

        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error fetching protected data:', error);
        throw error;
    }
};


function Protected() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchProtectedData()
            .then((posts) => {
                setPosts(posts);
            })
            .catch(() => {
                setMessage('Failed to create post');
            })
    }, [])

    const handleCreatePost = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await fetch('/api/post', {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, content }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create post');
                }

                const data = await response.json();
                setMessage(`Post created: ${data.title}`);
                setTitle('');
                setContent('');
                fetchProtectedData()
                    .then((posts) => {
                        setPosts(posts);
                    })
            } catch (error) {
                setMessage('Failed to create post');
            }
        } else {
            setMessage('No token found');
        }
    };

    return (
        <div>
            <h1>Protected Page</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Post Content"
            />
            <button onClick={handleCreatePost}>Create Post</button>
            <div>{message}</div>

            <div>
                <h2>All Posts</h2>
                <ul>
                    {posts.length && posts.map((post) => (
                        <li key={post.id} style={{ margin: '15px 0' }}>
                            <div>Title: {post.title}</div>
                            <div>Content: {post.content}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default withLayout(Protected, LayoutVariant.WithHeader)