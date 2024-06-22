import { LayoutVariant } from '@/const';
import { withLayout } from '@/hocs';
import { ListPostCards } from './ListPostCards';
import { CreatePostForm } from './CreatePostForm';

function Protected() {
    return (
        <div>
            <h1>Protected Page</h1>
            <CreatePostForm />
            <ListPostCards />
        </div>
    );
}

export default withLayout(Protected, LayoutVariant.WithHeader)
