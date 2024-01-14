import { LayoutVariant } from "./const";
import { FunctionComponent } from "react";
import { getLayoutComponent } from "./utils";

const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>, layoutVariant?: LayoutVariant) => {
    const LayoutComponent = getLayoutComponent(layoutVariant);

    const WithLayoutComponent = (props: T) => (
        <LayoutComponent>
            <Component {...props} />
        </LayoutComponent>
    );

    return WithLayoutComponent;
}

export { withLayout }
