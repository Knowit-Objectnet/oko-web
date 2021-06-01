import { UseMutationResult } from 'react-query';
import { ApiStasjon, deleteStasjon, stasjonDefaultQueryKey } from './StasjonService';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../../services/httpClient';

export const useDeleteStasjon = (): UseMutationResult<ApiStasjon, ApiError, string> =>
    useMutationWithInvalidation<ApiStasjon, ApiError, string>(
        (stasjonId) => deleteStasjon(stasjonId),
        stasjonDefaultQueryKey,
    );
