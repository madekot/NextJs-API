import { ReactNode } from "react";
import { Inter } from 'next/font/google'
import Header from '../Header';

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
    children: ReactNode;
    hasHeader?: boolean;
    hasFooter?: boolean;
}

const Layout = ({ children, hasFooter, hasHeader }: LayoutProps) => (
    <div className={inter.className}>
        {hasHeader && <Header />}
        {children}
        {hasFooter && <footer>Footer content</footer>}
    </div>
);

export { Layout }
export type { LayoutProps }
