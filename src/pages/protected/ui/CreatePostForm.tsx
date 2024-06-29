import { createPost } from '@/entities/post';
import { useMutationWithCacheInvalidation } from '@/shared/lib/useMutationWithCacheInvalidation';
import { useTimeout } from '@/shared/lib/useTimeout';
import { Message } from '@/shared/ui/Message';
import { useState } from 'react';

export function CreatePostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    useTimeout(() => setMessage(''))

    const mutationCreatePost = useMutationWithCacheInvalidation(createPost, {
        onSuccess: () => {
            setTitle('');
            setContent('');
            setMessage('Post created!');
        },
        onError: () => {
            setMessage('Failed to create post');
        },
        invalidateQueries: ['post-user'],
    });

    const handleCreatePost = ({ title, content }: { title: string, content: string }) => {
        mutationCreatePost.mutate({ title, content });
    };

    return (
        <div>
            <form>
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
                <button disabled={mutationCreatePost.isLoading} onClick={() => handleCreatePost({ content, title })}>Create Post</button>
            </form>
            <Message successMessage={message} />
        </div>
    );
}