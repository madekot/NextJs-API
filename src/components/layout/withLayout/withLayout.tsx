import { ComponentType } from "react";
import { LayoutProps, WithLayoutComponent, WithLayoutFunction } from "./types";
import { layoutComponents, LayoutType } from "./const";

const withLayout: WithLayoutFunction = (Component, layoutType) => {
    const LayoutComponent: ComponentType<LayoutProps> = layoutComponents[layoutType || LayoutType.Default];

    const WithLayoutComponent: WithLayoutComponent<typeof Component> = (props) => (
        <LayoutComponent>
            <Component {...props} />
        </LayoutComponent>
    );

    return WithLayoutComponent;
}

export { withLayout }
