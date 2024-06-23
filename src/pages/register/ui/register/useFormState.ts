import { useState } from 'react';

export const useFormState = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    return {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        resetForm,
    };
};