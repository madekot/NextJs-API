import { Post, deletePost, getAuthorizedUserPosts } from '@/entities/post';
import { ListPostCards as BaseListPostCards, PostCard } from '@/widgets/list-post-cards';
import Button from '@/shared/ui/Button';
import { useMutation, useQueryClient } from 'react-query';


export function ListPostCards({ getStatusDelete }: { getStatusDelete?: (message: string) => void }) {
    const queryClient = useQueryClient();

    const mutationDeletePost = useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries('post-user');
            getStatusDelete?.('post DELETED')
        },
    });

    const handleDeletePost = (id: number) => {
        mutationDeletePost.mutate(id);
    };

    return (
        <BaseListPostCards
            titleText='You posts'
            fetchFunction={getAuthorizedUserPosts}
            queryKey={'post-user'}
            renderProp={
                (posts) =>
                    <PostCard
                        {...posts}
                        renderProp={(post) => {
                            const { id } = post as Post
                            return <Button onClick={() => handleDeletePost(id)}>delete</Button>
                        }}
                    />
            }
        />
    );
}