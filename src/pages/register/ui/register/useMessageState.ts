import { useState } from 'react';

export const useMessageState = () => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    return {
        error,
        setError,
        message,
        setMessage,
    };
};
