import { useCustomQuery } from '@/shared/lib';
import type { Post } from '../types';
import type { ExtendedQueryOptions } from '@/shared/lib/useCustomQuery';

interface Props {
    renderProp: (props: Post) => React.ReactElement;
    fetchFunction: () => Promise<Post[]>;
    queryKey: string;
    titleText?: string;
    queryOptions?: ExtendedQueryOptions<Post[], Error>;
}

export function PostsList({ renderProp, fetchFunction, queryKey, titleText, queryOptions }: Props) {
    const { data: posts, status } = useCustomQuery<Post[]>(queryKey, fetchFunction, { isRefetchInterval: true, ...queryOptions });

    return (
        <div>
            {titleText && <h2>{titleText}</h2>}
            {{
                idle: <p>idle...</p>,
                loading: <p>Loading...</p>,
                error: <p>error: Failed to fetch posts</p>,
                success: (
                    <ul>
                        {!!posts?.length && posts.map((post) => (
                            <li key={post.id} style={{ margin: '15px 0' }}>
                                {renderProp && renderProp(post)}
                            </li>
                        ))}
                    </ul>
                ),
            }[status]}
        </div>
    );
}