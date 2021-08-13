import { MutationFunction, useMutation, UseMutationResult, useQueryClient } from 'react-query';

export const useMutationWithInvalidation = <TReturn, TError, TInput>(
    mutationFn: MutationFunction<TReturn, TInput>,
    queryKeysToInvalidate: Array<string>,
): UseMutationResult<TReturn, TError, TInput> => {
    const queryClient = useQueryClient();
    return useMutation<TReturn, TError, TInput>(mutationFn, {
        onSettled: () => {
            // We invalidate the cache after mutation is complete, so that data is refetched from the API
            queryKeysToInvalidate.forEach((queryKey) => queryClient.invalidateQueries(queryKey));
        },
    });
};
