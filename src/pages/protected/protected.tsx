import { LayoutVariant } from '@/const';
import { withLayout } from '@/hocs';
import { useState } from 'react';
import type { IPost } from '@/entities/post';
import { Post, PostsList, createPost, deletePost, getAuthorizedUserPosts } from '@/entities/post';
import Button from '@/shared/ui/Button';
import { useMutation, useQueryClient } from 'react-query';

function Protected() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const queryClient = useQueryClient();

    const mutationCreatePost = useMutation(createPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('post-user');
        },
    });

    const handleCreatePost = ({ title, content }: { title: string, content: string }) => {
        mutationCreatePost.mutate(
            { title, content },
            {
                onSuccess: () => {
                    setTitle('');
                    setContent('');
                    setMessage('Post create!');
                },
                onError: () => {
                    setMessage('Failed to create post');
                },
            }
        );
    };

    const mutationDeletePost = useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries('post-user');
            setMessage('Post deleted');
        },
    });

    const handleDeletePost = (id: number) => {
        mutationDeletePost.mutate(id);
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
            <button onClick={() => handleCreatePost({ content, title })}>Create Post</button>
            <div>{message}</div>

            <div>
                <h2>All Posts</h2>
                <PostsList fetchFunction={getAuthorizedUserPosts} queryKey={'post-user'} renderProp={(posts) => <Post {...posts} renderProp={(post) => {
                    const { id } = post as IPost
                    return <Button onClick={() => handleDeletePost(id)}>delete</Button>
                }} />} />
            </div>
        </div>
    );
}

export default withLayout(Protected, LayoutVariant.WithHeader)