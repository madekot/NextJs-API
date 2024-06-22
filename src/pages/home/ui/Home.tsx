import { LayoutVariant } from '@/const'
import { withLayout } from '@/hocs'
import { ListPostCards, PostCard } from '@/widgets/list-post-cards'
import { getAllUsersPosts } from '@/entities/post'

const Home = () => {
    return (
        <main>
            <ListPostCards
                renderProp={(props) => <PostCard {...props} />}
                fetchFunction={getAllUsersPosts}
                queryKey='post'
                titleText='All users posts'
            />
        </main>
    )
}

export default withLayout(Home, LayoutVariant.WithHeaderAndFooter)