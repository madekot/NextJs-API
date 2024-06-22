import { useEffect } from 'react';

export function useTimeout(callback: () => void, delay: number = 2000) {
    useEffect(() => {
        const timeStamp = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(timeStamp);
        };
    }, [callback, delay]);
}