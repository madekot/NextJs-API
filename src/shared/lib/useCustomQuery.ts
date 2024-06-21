import { QueryFunctionContext, QueryKey, UseQueryOptions, UseQueryResult, useQuery } from 'react-query';
import { useEffect, useState } from 'react';

type FetchFunction<T> = (context: QueryFunctionContext<QueryKey>) => Promise<T>;
type Status = 'idle' | 'loading' | 'success' | 'error';

type PostsQueryResult<T> = {
    data?: T;
    status: Status;
    restQueryResult: Omit<UseQueryResult<T, Error>, 'data' | 'isLoading'>;
};

export interface ExtendedQueryOptions<T, E> extends UseQueryOptions<T, E> {
    isRefetchInterval?: boolean;
}

function useCustomQuery<T>(queryKey: string, fetchFunction: FetchFunction<T>, options?: ExtendedQueryOptions<T, Error>): PostsQueryResult<T> {
    const [currentStatus, setCurrentStatus] = useState<Status>('idle');

    const { data, isLoading, ...restQueryResult } = useQuery<T, Error>(queryKey, fetchFunction, {
        refetchInterval: options?.isRefetchInterval && 5000,
        onSuccess: () => setCurrentStatus('success'),
        onError: () => setCurrentStatus('error'),
        ...options,
    });

    useEffect(() => {
        if (isLoading) {
            setCurrentStatus('loading');
        }
    }, [isLoading]);

    return { data, status: currentStatus, restQueryResult };
}

export { useCustomQuery }
