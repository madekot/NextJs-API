import { Card } from '@/shared/ui/Card';
import type { Post as IPost } from '../types';

export function Post(props: IPost) {
    return (
        <Card {...props} />
    );
}