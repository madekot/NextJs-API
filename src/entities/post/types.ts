import { Post as PostPrisma } from '@prisma/client';

export interface Post extends PostPrisma {
    author: string
    renderProp?: (props?: unknown) => React.ReactElement;
}