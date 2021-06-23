import { UseMutationResult } from 'react-query';
import { avtaleDefaultQueryKey } from '../avtale/AvtaleService';
import { ApiHenteplan, deleteHenteplan, henteplanDefaultQueryKey } from '../henteplan/HenteplanService';
import { ApiError } from '../httpClient';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { planlagtHentingDefaultQueryKey } from './HentingService';

export const useDeleteHenteplan = (): UseMutationResult<ApiHenteplan, ApiError, string> =>
    useMutationWithInvalidation<ApiHenteplan, ApiError, string>(
        (henteplanId) => deleteHenteplan(henteplanId),
        [henteplanDefaultQueryKey, avtaleDefaultQueryKey, planlagtHentingDefaultQueryKey],
    );
