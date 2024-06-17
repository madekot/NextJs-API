import { useEffect, useState } from 'react';
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';
import { Post } from '@prisma/client';

type Status = 'idle' | 'loading' | 'success' | 'error';

type FetchFunction<T> = () => Promise<T>;

type PostWithAuthor = Post & { author: string };

type PostsQueryResult<T> = {
    data?: T;
    status: Status;
    restQueryResult: Omit<UseQueryResult<T, Error>, 'data' | 'isLoading'>;
};

interface ExtendedQueryOptions<T, E> extends UseQueryOptions<T, E> {
    isRefetchInterval?: boolean;
}

function usePostsQuery<T>(queryKey: string, fetchFunction: FetchFunction<T>, options?: ExtendedQueryOptions<T, Error>): PostsQueryResult<T> {
    const [currentStatus, setCurrentStatus] = useState<Status>('idle');

    const { data, isLoading, ...restQueryResult } = useQuery<T, Error>(queryKey, fetchFunction, {
        refetchInterval: options?.isRefetchInterval && 5000,
        onSuccess: () => setCurrentStatus('success'),
        onError: () => setCurrentStatus('error'),
        ...options,
    });

    useEffect(() => {
        if (isLoading) {
            setCurrentStatus('loading');
        }
    }, [isLoading]);

    return { data, status: currentStatus, restQueryResult };
}

const fetchPosts: FetchFunction<PostWithAuthor[]> = async () => {
    const res = await fetch('/api/posts');
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
};

export default function AllUsersAllPosts() {
    const { data: posts, status } = usePostsQuery<PostWithAuthor[]>('posts', fetchPosts, { isRefetchInterval: true });

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
            }[status]}
        </div>
    );
}
