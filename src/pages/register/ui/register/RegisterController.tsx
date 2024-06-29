import { CreateNewUserForm } from './CreateNewUserForm';
import { useRouter } from 'next/router';
import { createUser } from '@/entities/user';
import { useFormState } from './useFormState';
import { Message } from '@/shared/ui/Message';
import { useAutoClearMessage, useMessageState } from '@/widgets/message';

export function RegisterController() {
    const { name, setName, email, setEmail, password, setPassword, resetForm } = useFormState();
    const { error, setError, message, setMessage } = useMessageState();
    const router = useRouter();

    useAutoClearMessage(message, setMessage, 1000);
    useAutoClearMessage(error, setError, 1000);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUser({ email, name, password })
            setMessage('The user has been successfully created!');
            setTimeout(() => {
                router.push('./login');
            }, 3000);
        } catch (error) {
            setError((error as Error).message)
        }
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
            <Message errorMessage={error} successMessage={message} />
        </div>
    );
}