import { getAuthorizationToken } from '@/shared/lib/authorizationToken';
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

export const getAuthorizedUserPosts = async (): Promise<Post[]> => {
    const token = getAuthorizationToken();

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
        return [];
    }
};

export const createPost = async (title: string, content: string): Promise<void> => {
    const token = getAuthorizationToken();

    if (token) {
        try {
            const res = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch protected data');
            }
        } catch (error) {
            console.error('Error fetching protected data:', error);
        }
    } else {
        console.error('No token found');
    }
};

export const deletePost = async (id: number) => {
    const token = getAuthorizationToken();

    if (token) {
        const res = await fetch(`/api/post`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId: id })
        });


        if (!res.ok) {
            throw new Error('Failed to delete post');
        }

        return res.json();
    }
};