import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiAvtale, ApiAvtalePatch, avtaleDefaultQueryKey, patchAvtale } from './AvtaleService';
import { ApiError } from '../httpClient';

export const useUpdateAvtale = (): UseMutationResult<ApiAvtale, ApiError, ApiAvtalePatch> =>
    useMutationWithInvalidation<ApiAvtale, ApiError, ApiAvtalePatch>(
        (updatedAvtale) => patchAvtale(updatedAvtale),
        [avtaleDefaultQueryKey],
    );
