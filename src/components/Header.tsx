import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <ul>
                <li>
                    <Link href={'/'}>home</Link>
                </li>
                <li>
                    <Link href={'/register'}>register</Link>
                </li>
                <li>
                    <Link href={'/login'}>login</Link>
                </li>
                <li>
                    <Link href={'/protected'}>protected page</Link>
                </li>
            </ul>
        </header>
    );
}