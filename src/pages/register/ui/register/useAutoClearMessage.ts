import { useEffect } from 'react';

export const useAutoClearMessage = (setMessage: (message: string) => void, setError: (error: string) => void, delay: number) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
            setError('');
        }, delay);

        return () => clearTimeout(timer);
    }, [setMessage, setError, delay]);
};
