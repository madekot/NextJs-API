import { LayoutVariant } from '@/const';
import { withLayout } from '@/hocs';
import { useState } from 'react';
import { createPost, } from '@/entities/post';
import { useMutation, useQueryClient } from 'react-query';
import { ListPostCards } from './ListPostCards';

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
            <ListPostCards getStatusDelete={(message) => setMessage(message)} />
        </div>
    );
}

export default withLayout(Protected, LayoutVariant.WithHeader)