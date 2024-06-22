import { QueryFunctionContext, QueryKey, UseQueryOptions, UseQueryResult, useQuery } from 'react-query';
import { useState } from 'react';

type FetchFunction<T> = (context: QueryFunctionContext<QueryKey>) => Promise<T>;

export interface ExtendedQueryOptions<T, E> extends UseQueryOptions<T, E> {
    isRefetchInterval?: boolean;
}

function useCustomQuery<T>(queryKey: string, fetchFunction: FetchFunction<T>, options?: ExtendedQueryOptions<T, Error>): UseQueryResult<T, Error> {
    const [repeatAfterError, setRepeatAfterError] = useState(true);

    const { ...rest } = useQuery<T, Error>(queryKey, fetchFunction, {
        refetchInterval: repeatAfterError && options?.isRefetchInterval && 5000,
        onError: () => {
            setRepeatAfterError(false)
        },
        ...options,
    });

    return { ...rest };
}

export { useCustomQuery }
