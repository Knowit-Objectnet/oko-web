import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiHenteplan, ApiHenteplanPatch, henteplanDefaultQueryKey, patchHenteplan } from './HenteplanService';
import { ApiError } from '../httpClient';
import { avtaleDefaultQueryKey } from '../avtale/AvtaleService';

export const useUpdateHenteplan = (): UseMutationResult<ApiHenteplan, ApiError, ApiHenteplanPatch> =>
    useMutationWithInvalidation<ApiHenteplan, ApiError, ApiHenteplanPatch>(
        (updatedHenteplan) => patchHenteplan(updatedHenteplan),
        [henteplanDefaultQueryKey, avtaleDefaultQueryKey],
    );
