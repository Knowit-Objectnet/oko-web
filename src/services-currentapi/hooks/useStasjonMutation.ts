import { MutationFunction, useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { ApiStasjon, ApiStasjonPost, deleteStasjon, postStasjon, stasjonDefaultQueryKey } from '../StasjonService';
import { AxiosError } from 'axios';

const useStasjonMutation = <TReturn, TError, TInput>(
    mutationFn: MutationFunction<TReturn, TInput>,
): UseMutationResult<TReturn, TError, TInput> => {
    const queryClient = useQueryClient();
    return useMutation<TReturn, TError, TInput>(mutationFn, {
        onSettled: () => {
            // We invalidate the cache after mutation is complete, so that data is refetched from the API
            queryClient.invalidateQueries(stasjonDefaultQueryKey);
        },
    });
};
// TODO: we might want to use our own error-object here, not AxiosError
export const useAddStasjon = (): UseMutationResult<ApiStasjon, AxiosError, ApiStasjonPost> =>
    useStasjonMutation<ApiStasjon, AxiosError, ApiStasjonPost>((newStasjon) => postStasjon(newStasjon));

// TODO: we might want to use our own error-object here, not AxiosError
export const useDeleteStasjon = (): UseMutationResult<ApiStasjon, AxiosError, string> =>
    useStasjonMutation<ApiStasjon, AxiosError, string>((stasjonId) => deleteStasjon(stasjonId));
