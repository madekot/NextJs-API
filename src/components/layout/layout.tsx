import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    hasHeader: boolean;
    hasFooter: boolean;
}

const Layout = ({ children, hasFooter, hasHeader }: LayoutProps) => (
    <div>
        {hasHeader && <header>Header content</header>}
        <main>{children}</main>
        {hasFooter && <footer>Footer content</footer>}
    </div>
);

export { Layout }
