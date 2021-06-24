import { UseMutationResult } from 'react-query';
import { henteplanDefaultQueryKey } from '../henteplan/HenteplanService';
import { planlagtHentingDefaultQueryKey } from '../henting/HentingService';
import { ApiError } from '../httpClient';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiAvtale, avtaleDefaultQueryKey, deleteAvtale } from './AvtaleService';

export const useDeleteAvtale = (): UseMutationResult<ApiAvtale, ApiError, string> =>
    useMutationWithInvalidation<ApiAvtale, ApiError, string>(
        (avtaleId) => deleteAvtale(avtaleId),
        [avtaleDefaultQueryKey, henteplanDefaultQueryKey, planlagtHentingDefaultQueryKey],
    );
