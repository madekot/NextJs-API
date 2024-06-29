import { useEffect } from 'react';

export const useAutoClearMessage = (message: string, setMessage: (message: string) => void, delay: number) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, delay);

        return () => clearTimeout(timer);
    }, [message, setMessage, delay]);
};