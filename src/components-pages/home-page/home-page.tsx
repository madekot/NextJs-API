import AllUsersAllPosts from '@/components/AllPosts'
import { LayoutVariant } from '@/const'
import { withLayout } from '@/hocs'

const HomePage = () => {
    return (
        <main>
            <AllUsersAllPosts />
        </main>
    )
}

const HomePageWithLayout = withLayout(HomePage, LayoutVariant.WithHeaderAndFooter)

export default HomePageWithLayout