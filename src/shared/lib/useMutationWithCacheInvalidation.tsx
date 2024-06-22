import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

type MutationOptions<TData, TVariables> = Omit<UseMutationOptions<TData, any, TVariables, any>, 'mutationFn'> & {
    invalidateQueries?: string[];
};

export function useMutationWithCacheInvalidation<TData = any, TVariables = void>(
    mutationFn: MutationFn<TData, TVariables>,
    options: MutationOptions<TData, TVariables> = {}
) {
    const queryClient = useQueryClient();

    const { invalidateQueries = [], ...mutationOptions } = options;

    const mutation = useMutation<TData, any, TVariables, any>(
        mutationFn,
        {
            ...mutationOptions,
            onSuccess: (data, variables, context) => {
                mutationOptions.onSuccess?.(data, variables, context);
                invalidateQueries.forEach(queryKey => {
                    queryClient.invalidateQueries(queryKey);
                });
            },
            onError: mutationOptions.onError,
            onSettled: mutationOptions.onSettled,
        }
    );

    return mutation;
}