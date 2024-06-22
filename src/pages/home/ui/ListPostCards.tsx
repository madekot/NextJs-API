import { useCustomQuery } from "@/shared/lib";
import { Post, getAllUsersPosts } from '@/entities/post';
import { ListPostCards as BaseListPostCards, PostCard } from '@/widgets/list-post-cards';

export function ListPostCards() {
    const { data: posts, status, error } = useCustomQuery<Post[]>('post', getAllUsersPosts, { isRefetchInterval: true });

    return (
        <BaseListPostCards
            errorMessage={error?.message}
            status={status}
            posts={posts}
            renderProp={(props) => <PostCard {...props} />}
            titleText='All users posts'
        />
    );
}