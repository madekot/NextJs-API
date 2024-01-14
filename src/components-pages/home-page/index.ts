import { HomePage } from './home-page'
import { LayoutType, withLayout } from "@/components";


const HomePageWithLayout = withLayout(HomePage, LayoutType.HeaderAndFooter);

export { HomePageWithLayout as HomePage };
