import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { ApiAvtale, ApiAvtalePost, avtaleDefaultQueryKey, postAvtale } from './AvtaleService';

export const useAddAvtale = (): UseMutationResult<ApiAvtale, ApiError, ApiAvtalePost> =>
    useMutationWithInvalidation<ApiAvtale, ApiError, ApiAvtalePost>(
        (newAvtale) => postAvtale(newAvtale),
        avtaleDefaultQueryKey,
    );
