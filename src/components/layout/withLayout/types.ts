import { ComponentType, ReactNode } from "react";
import { LayoutType } from "./const";

interface LayoutProps {
    children: ReactNode;
}

interface WithLayoutProps {
    layoutType?: LayoutType;
}

type WithLayoutComponentProps<P> = P & WithLayoutProps;

type WithLayoutFunction = <P>(
    Component: ComponentType<P>,
    layoutType?: LayoutType
) => React.FC<WithLayoutComponentProps<P>>;

type WithLayoutComponent<P> = React.FC<WithLayoutComponentProps<P>>;

type LayoutComponents = Record<LayoutType, ComponentType<LayoutProps>>;

export type {
    LayoutProps,
    WithLayoutFunction,
    LayoutComponents,
    WithLayoutComponent,
}
