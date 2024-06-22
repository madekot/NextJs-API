import { Post } from '@/entities/post';

interface Props {
    renderProp: (props: Post) => React.ReactElement;
    titleText?: string;
    errorMessage?: string;
    posts?: Post[];
    status: string;
}

export function ListPostCards({ renderProp, titleText, posts, errorMessage, status }: Props) {
    return (
        <div>
            {titleText && <h2>{titleText}</h2>}
            {{
                idle: <p>idle...</p>,
                loading: <p>Loading...</p>,
                error: <p>ERROR: {errorMessage}</p>,
                success:
                    posts?.length ?
                        <ul>
                            {posts?.map((post) => (
                                <li key={post.id} style={{ margin: '15px 0' }}>
                                    {renderProp && renderProp(post)}
                                </li>
                            ))}
                        </ul> :
                        <h3> There are no posts, write them!</h3>,
            }[status]}
        </div>
    );
}