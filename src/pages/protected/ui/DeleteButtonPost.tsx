import { deletePost } from '@/entities/post';
import { useMutationWithCacheInvalidation } from '@/shared/lib/useMutationWithCacheInvalidation';
import Button from '@/shared/ui/Button';

export function DeleteButtonPost({ id }: { id: number }) {
    const mutationDeletePost = useMutationWithCacheInvalidation(deletePost, {
        invalidateQueries: ['post-user'],
    });

    const handleDeletePost = (id: number) => {
        mutationDeletePost.mutate(id);
    };

    return <Button disabled={mutationDeletePost.isLoading || mutationDeletePost.isSuccess} onClick={() => handleDeletePost(id)}>delete</Button>
}