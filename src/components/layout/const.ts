import { FunctionComponent } from "react";
import { Layout, LayoutProps } from "./layout";
import { LayoutWithHeader } from "./layout-with-header";
import { LayoutWithFooter } from "./layout-with-footer";
import { LayoutWithHeaderAndFooter } from "./layout-with-header-and-footer";

enum LayoutVariant {
    HeaderOnly = 'headerOnly',
    FooterOnly = 'footerOnly',
    HeaderAndFooter = 'headerAndFooter',
    Default = 'default',
}

const variantToLayoutComponent: Record<LayoutVariant, FunctionComponent<LayoutProps>> = {
    [LayoutVariant.HeaderOnly]: LayoutWithHeader,
    [LayoutVariant.FooterOnly]: LayoutWithFooter,
    [LayoutVariant.HeaderAndFooter]: LayoutWithHeaderAndFooter,
    [LayoutVariant.Default]: Layout,
};

export {
    variantToLayoutComponent,
    LayoutVariant
}
