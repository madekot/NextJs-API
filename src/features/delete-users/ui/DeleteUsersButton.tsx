import { deleteAllUsersAndPosts } from '@/entities/user';
import Button from '@/shared/ui/Button';
import { useState } from 'react';

export function DeleteUsersButton() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
}
