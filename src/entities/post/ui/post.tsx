import { Card } from '@/shared/ui/Card';
import type { Post } from '../types';

interface Props extends Post {
    handleDeletePost?: () => void;
}

export function Post(props: Props) {
    return (
        <Card {...props} />
    );
}