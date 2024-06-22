import { LayoutVariant } from '@/const'
import { withLayout } from '@/hocs'
import { ListPostCards } from './ListPostCards'

const Home = () => {
    return (
        <main>
            <ListPostCards />
        </main>
    )
}

export default withLayout(Home, LayoutVariant.WithHeaderAndFooter)