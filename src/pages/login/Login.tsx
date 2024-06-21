import { useState } from 'react';
import { useRouter } from 'next/router';
import { LayoutVariant } from '@/const';
import { withLayout } from '@/hocs';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('token', data.token);
            router.push('/protected');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default withLayout(Login, LayoutVariant.WithHeaderAndFooter)