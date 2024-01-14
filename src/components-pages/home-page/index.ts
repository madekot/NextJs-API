import { HomePage } from './home-page'
import { withLayout } from "@/hocs";
import { LayoutVariant } from "@/const";

const HomePageWithLayout = withLayout(HomePage, LayoutVariant.HeaderAndFooter);

export { HomePageWithLayout as HomePage };
