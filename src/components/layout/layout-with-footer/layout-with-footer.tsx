import { ReactNode } from 'react';
import { Layout } from "../layout";

interface LayoutWithFooterProps {
    children: ReactNode;
}

const LayoutWithFooter = (props: LayoutWithFooterProps) => (
    <Layout {...props} hasFooter>{props.children}</Layout>
);

export { LayoutWithFooter };
