import { LayoutVariant, variantToLayoutComponent } from "./const";

const getLayoutComponent = (layoutVariant?: LayoutVariant) => {
    return variantToLayoutComponent[layoutVariant || LayoutVariant.Default];
}

export { getLayoutComponent }
