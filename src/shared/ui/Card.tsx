import Button from './Button';

interface Props {
    author: string;
    content: string;
    title: string;
    handleButton?: () => void;
}

export function Card({ author, content, title, handleButton }: Props) {
    return (
        <div>
            <div>Author: {author}</div>
            <div>Title: {title}</div>
            <div>Content: {content}</div>
            {handleButton && <Button onClick={() => handleButton()}>click</Button>}
        </div>
    );
}
