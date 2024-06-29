import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface Props {
    children: ReactNode;
}

const QueryClientProvider = ({ children }: Props) => (
    <ReactQueryClientProvider client={queryClient}>
        {children}
    </ReactQueryClientProvider>
);

export default QueryClientProvider;