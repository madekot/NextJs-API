
import { LayoutVariant } from '@/const'
import { ShowAllPostsUsers } from '@/features/show-all-posts-users'
import { withLayout } from '@/hocs'


const Home = () => {
    return (
        <main>
            <ShowAllPostsUsers />
        </main>
    )
}

export default withLayout(Home, LayoutVariant.WithHeaderAndFooter)