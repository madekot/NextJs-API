import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const HomePage = () => {
    return (
        <main className={`${inter.className}`}>
            HELLO NEXT
        </main>
    )
}
