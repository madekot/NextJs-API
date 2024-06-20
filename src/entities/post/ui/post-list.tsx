import { useCustomQuery } from '@/shared/lib';
import type { Post } from '../types';

interface Props {
    PostSlot: React.FC<Post>;
    fetchFunction: () => Promise<Post[]>;
    queryKey: string;
    titleText?: string;
}

export function PostsList({ PostSlot: Post, fetchFunction, queryKey, titleText }: Props) {
    const { data: posts, status } = useCustomQuery<Post[]>(queryKey, fetchFunction, { isRefetchInterval: true });

    return (
        <div>
            {titleText && <h2>{titleText}</h2>}
            {{
                idle: <p>idle...</p>,
                loading: <p>Loading...</p>,
                error: <p>error: Failed to fetch posts</p>,
                success: (
                    <ul>
                        {posts?.length && posts.map((post) => (
                            <li key={post.id} style={{ margin: '15px 0' }}>
                                <Post {...post} />
                            </li>
                        ))}
                    </ul>
                ),
            }[status]}
        </div>
    );
}