import { deleteAllUsersAndPosts } from '@/entities/user';
import Button from '@/shared/ui/Button';
import { Message } from '@/shared/ui/Message';
import { useAutoClearMessage, useMessageState } from '@/widgets/message';
import { useState } from 'react';

export function DeleteUsersButton() {
    const [loading, setLoading] = useState(false);
    const { error, message, setError: setErrorMessage, setMessage: setSuccessMessage } = useMessageState()

    useAutoClearMessage(message, setSuccessMessage, 1000)
    useAutoClearMessage(error, setErrorMessage, 1000)

    const handleDeleteUsers = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const data = await deleteAllUsersAndPosts()
            setSuccessMessage(data.message);
        } catch (error) {
            setErrorMessage((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button onClick={handleDeleteUsers} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete All Users and Posts'}
            </Button>
            <Message errorMessage={error} successMessage={message} />
        </div>
    );
}
