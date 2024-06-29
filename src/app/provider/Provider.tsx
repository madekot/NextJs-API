import QueryClientProvider from './QueryClientProvider';

interface Props {
    children: React.ReactNode;
}

function Provider({ children }: Props) {
    return (
        <QueryClientProvider>
            {children}
        </QueryClientProvider>
    );
}

export default Provider