import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { ApiHenteplan, ApiHenteplanPost, henteplanDefaultQueryKey, postHenteplan } from './HenteplanService';
import { avtaleDefaultQueryKey } from '../avtale/AvtaleService';
import { planlagtHentingDefaultQueryKey } from '../henting/PlanlagtHentingService';

export const useAddHenteplan = (): UseMutationResult<ApiHenteplan, ApiError, ApiHenteplanPost> =>
    useMutationWithInvalidation<ApiHenteplan, ApiError, ApiHenteplanPost>(
        (newHenteplan) => postHenteplan(newHenteplan),
        [henteplanDefaultQueryKey, avtaleDefaultQueryKey, planlagtHentingDefaultQueryKey],
    );
