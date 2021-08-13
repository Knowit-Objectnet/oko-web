import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { aarsakDefaultQueryKey, ApiAarsak, deleteAarsak } from './AarsakService';

export const useDeleteAarsak = (): UseMutationResult<ApiAarsak, ApiError, string> =>
    useMutationWithInvalidation<ApiAarsak, ApiError, string>(
        (aarsakId) => deleteAarsak(aarsakId),
        [aarsakDefaultQueryKey],
    );
