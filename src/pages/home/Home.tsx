
import { LayoutVariant } from '@/const'
import { UsersPosts } from '@/widgets/UsersPosts'
import { withLayout } from '@/hocs'

const Home = () => {
    return (
        <main>
            <UsersPosts />
        </main>
    )
}

export default withLayout(Home, LayoutVariant.WithHeaderAndFooter)