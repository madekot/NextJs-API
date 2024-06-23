import { Post, getAuthorizedUserPosts } from '@/entities/post';
import { ListPostCards as BaseListPostCards, PostCard } from '@/widgets/list-post-cards';
import { DeleteButtonPost } from './DeleteButtonPost';
import { useCustomQuery } from '@/shared/lib';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function ListPostCards() {
    const { data: posts, status, error } = useCustomQuery<Post[]>('post-user', getAuthorizedUserPosts, { isRefetchInterval: true });
    const router = useRouter();

    useEffect(() => {
        if (!error) {
            return;
        }

        const timeStamp = setTimeout(() => router.push('./login'), 2000);
        return () => clearTimeout(timeStamp);
    }, [error, router]);

    return (
        <BaseListPostCards
            titleText='You posts'
            posts={posts}
            errorMessage={error?.message}
            status={status}
            renderProp={
                (posts) =>
                    <PostCard
                        {...posts}
                        renderProp={(post) => {
                            const { id } = post as Post
                            return <DeleteButtonPost id={id} />
                        }}
                    />
            }
        />
    );
}