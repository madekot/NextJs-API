import { ReactNode } from 'react';
import { Layout } from "./layout";

interface LayoutWithHeaderProps {
    children: ReactNode;
}

const LayoutWithHeader = (props: LayoutWithHeaderProps) => (
    <Layout {...props} hasHeader>{props.children}</Layout>
);

export { LayoutWithHeader };
