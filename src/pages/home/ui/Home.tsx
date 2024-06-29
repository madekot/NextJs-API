import { LayoutVariant } from '@/const'
import { withLayout } from '@/hocs'
import { ListPostCards } from './ListPostCards'
import { DeleteUsersButton } from '@/features/delete-users'

const Home = () => {
    return (
        <main>
            <ListPostCards />
            <DeleteUsersButton />
        </main>
    )
}

export default withLayout(Home, LayoutVariant.WithHeaderAndFooter)