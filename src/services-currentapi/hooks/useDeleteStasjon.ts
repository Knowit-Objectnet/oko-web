import { UseMutationResult } from 'react-query';
import { ApiStasjon, deleteStasjon, stasjonDefaultQueryKey } from '../StasjonService';
import { AxiosError } from 'axios';
import { useMutationWithInvalidation } from './useMutationWithInvalidation';

// TODO: we might want to use our own error-object here, not AxiosError
export const useDeleteStasjon = (): UseMutationResult<ApiStasjon, AxiosError, string> =>
    useMutationWithInvalidation<ApiStasjon, AxiosError, string>(
        (stasjonId) => deleteStasjon(stasjonId),
        stasjonDefaultQueryKey,
    );
