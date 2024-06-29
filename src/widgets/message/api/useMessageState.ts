import { useCallback, useState } from 'react';

export const useMessageState = () => {
    const [error, setErrorState] = useState('');
    const [message, setMessageState] = useState('');

    const setError = useCallback((error: string) => {
        setErrorState(error);
    }, [error]);

    const setMessage = useCallback((message: string) => {
        setMessageState(message);
    }, [message]);


    return {
        error,
        setError,
        message,
        setMessage,
    };
};
