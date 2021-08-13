import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { aarsakDefaultQueryKey, ApiAarsak, ApiAarsakPatch, patchAarsak } from './AarsakService';

export const useUpdateAarsak = (): UseMutationResult<ApiAarsak, ApiError, ApiAarsakPatch> =>
    useMutationWithInvalidation<ApiAarsak, ApiError, ApiAarsakPatch>(
        (updatedAarsak) => patchAarsak(updatedAarsak),
        [aarsakDefaultQueryKey],
    );
