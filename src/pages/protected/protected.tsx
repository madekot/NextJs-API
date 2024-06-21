import { LayoutVariant } from '@/const';
import { withLayout } from '@/hocs';
import { useEffect, useState } from 'react';
import type { IPost } from '@/entities/post';
import { Post, createPost, deletePost, getAuthorizedUserPosts } from '@/entities/post';
import Button from '@/shared/ui/Button';

function Protected() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        getAuthorizedUserPosts()
            .then((posts) => {
                setPosts(posts);
            })
            .catch(() => {
                setMessage('Failed to create post');
            })
    }, [])

    const handleCreatePost = async () => {
        try {
            await createPost(title, content);
            setTitle('');
            setContent('');
            const posts = await getAuthorizedUserPosts();
            setPosts(posts);
        } catch {
            setMessage('Failed to create post');
        }
    };

    const handleDeletePost = async (id: IPost['id']) => {
        try {
            await deletePost(id)
            setMessage('Post deleted');
            const data = await getAuthorizedUserPosts();
            setPosts(data);
        } catch {
            setMessage('Failed to create post');
        }
    }

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
                {/* {posts && <PostsList fetchFunction={getAuthorizedUserPosts} queryKey={'post-user'} renderProp={(posts) => <Post {...posts} renderProp={(post) => {
                    const { id } = post as IPost
                    return <Button onClick={() => handleDeletePost(id)}>delete</Button>
                }} />} />} */}
                <ul>
                    {!!posts.length && posts.map((post) => (
                        <li key={post.id} style={{ margin: '15px 0' }}>
                            <Post {...post} renderProp={() => <Button onClick={() => handleDeletePost(post.id)}>delete</Button>} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default withLayout(Protected, LayoutVariant.WithHeader)