interface Props {
    author?: string;
    content: string;
    title: string;
    renderProp?: (props?: unknown) => React.ReactElement;
}

export function Card(props: Props) {
    const { author, content, title, renderProp } = props
    return (
        <div>
            {author && <div>Author: {author}</div>}
            <div>Title: {title}</div>
            <div>Content: {content}</div>
            {renderProp && renderProp(props)}
        </div>
    );
}
