interface Props {
    errorMessage?: string;
    successMessage?: string;
}

export const Message = ({ errorMessage, successMessage }: Props) => {
    return (
        <div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};
