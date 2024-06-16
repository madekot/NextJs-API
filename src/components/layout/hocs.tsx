import { FunctionComponent } from "react";
import { LayoutWithHeader } from "./layout-with-header";
import { LayoutWithFooter } from "./layout-with-footer";
import { LayoutWithHeaderAndFooter } from "./layout-with-header-and-footer";
import { Layout } from "./layout";

enum LayoutVariant {
    WithHeader = 'WithHeader',
    WithFooter = 'WithFooter',
    WithHeaderAndFooter = 'WithHeaderAndFooter',
    OnlyContent = 'OnlyContent',
}

const getLayoutComponent = (layoutVariant: LayoutVariant) => {
    switch (layoutVariant) {
        case LayoutVariant.WithHeader:
            return LayoutWithHeader
        case LayoutVariant.WithFooter:
            return LayoutWithFooter
        case LayoutVariant.WithHeaderAndFooter:
            return LayoutWithHeaderAndFooter
        case LayoutVariant.OnlyContent:
            return Layout
        default:
            console.warn(`Unknown layout variant: ${layoutVariant}, defaulting to OnlyContent layout.`);
            return Layout
    }
}

const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>, layoutVariant: LayoutVariant) => {
    const LayoutComponent = getLayoutComponent(layoutVariant);

    const WithLayoutComponent = (props: T) => (
        <LayoutComponent>
            <Component {...props} />
        </LayoutComponent>
    );

    return WithLayoutComponent;
}

export { withLayout, LayoutVariant }
