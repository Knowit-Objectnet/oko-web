import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { aarsakDefaultQueryKey, ApiAarsak, ApiAarsakPost, postAarsak } from './AarsakService';

export const useAddAarsak = (): UseMutationResult<ApiAarsak, ApiError, ApiAarsakPost> =>
    useMutationWithInvalidation<ApiAarsak, ApiError, ApiAarsakPost>(
        (newAarsak) => postAarsak(newAarsak),
        [aarsakDefaultQueryKey],
    );
