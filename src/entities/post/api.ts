import { Post } from './types';

export const getAllUsersPosts = async (): Promise<Post[]> => {
    const res = await fetch('/api/posts');
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
};

export const getUserAllPosts = async (id: string): Promise<Post[]> => {
    const res = await fetch(`/api/posts/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
};