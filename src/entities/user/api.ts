import { User } from './types';

export const createUser = async ({ name, email, password }: Pick<User, 'name' | 'email' | 'password'>): Promise<void> => {
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.error)
    }
};