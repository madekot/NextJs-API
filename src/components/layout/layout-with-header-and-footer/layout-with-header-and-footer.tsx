import { ReactNode } from 'react';
import { Layout } from "../layout";

interface LayoutWithHeaderAndFooterProps {
    children: ReactNode;
}

const LayoutWithHeaderAndFooter = (props: LayoutWithHeaderAndFooterProps) => (
    <Layout {...props} hasHeader hasFooter>{props.children}</Layout>
);

export { LayoutWithHeaderAndFooter };
