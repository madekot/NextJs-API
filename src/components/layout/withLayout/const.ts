import { LayoutComponents } from "./types";
import { LayoutWithHeader } from "../layout-with-header";
import { LayoutWithFooter } from "../layout-with-footer";
import { LayoutWithHeaderAndFooter } from "../layout-with-header-and-footer";
import { Layout } from "../layout";


enum LayoutType {
    HeaderOnly = 'headerOnly',
    FooterOnly = 'footerOnly',
    HeaderAndFooter = 'headerAndFooter',
    Default = 'default',
}

const layoutComponents: LayoutComponents = {
    [LayoutType.HeaderOnly]: LayoutWithHeader,
    [LayoutType.FooterOnly]: LayoutWithFooter,
    [LayoutType.HeaderAndFooter]: LayoutWithHeaderAndFooter,
    [LayoutType.Default]: Layout,
};

export {
    layoutComponents,
    LayoutType
}
