import { Post } from '@/entities/post';
import { Card } from '@/shared/ui/Card';

export function PostCard(props: Post) {
    return (
        <Card {...props} />
    );
}
