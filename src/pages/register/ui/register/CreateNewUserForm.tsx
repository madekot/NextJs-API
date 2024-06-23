interface CreateNewUserFormProps {
    name: string;
    email: string;
    password: string;
    handleChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const CreateNewUserForm: React.FC<CreateNewUserFormProps> = ({
    email,
    name,
    password,
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(handleChangeName)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
            />
            <button>Register</button>
        </form>
    );
}