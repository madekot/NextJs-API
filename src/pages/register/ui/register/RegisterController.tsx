import { CreateNewUserForm } from './CreateNewUserForm';
import { useRouter } from 'next/router';
import { createUser } from '@/entities/user';
import { useFormState } from './useFormState';
import { useAutoClearMessage } from './useAutoClearMessage';
import { useMessageState } from './useMessageState';

export function RegisterController() {
    const { name, setName, email, setEmail, password, setPassword, resetForm } = useFormState();
    const { error, setError, message, setMessage } = useMessageState();
    const router = useRouter();

    useAutoClearMessage(setMessage, setError, 2000);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUser({ email, name, password })
            .then(() => {
                setMessage('The user has been successfully created!');
                setTimeout(() => {
                    router.push('./login');
                }, 2000);
            })
            .catch((error) => setError(error.message));

        resetForm();
    };

    return (
        <div>
            <CreateNewUserForm
                email={email}
                name={name}
                password={password}
                handleChangeName={(e) => setName(e.target.value)}
                handleChangeEmail={(e) => setEmail(e.target.value)}
                handleChangePassword={(e) => setPassword(e.target.value)}
                handleSubmit={(e) => handleRegister(e)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
}