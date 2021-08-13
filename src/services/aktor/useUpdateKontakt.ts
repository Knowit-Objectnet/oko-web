import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiKontakt, ApiKontaktPatch, kontaktDefaultQueryKey, patchKontakt } from './KontaktService';
import { ApiError } from '../httpClient';
import { partnerDefaultQueryKey } from '../partner/PartnerService';
import { stasjonDefaultQueryKey } from '../stasjon/StasjonService';

export const useUpdateKontakt = (): UseMutationResult<ApiKontakt, ApiError, ApiKontaktPatch> =>
    useMutationWithInvalidation<ApiKontakt, ApiError, ApiKontaktPatch>(
        (updatedKontakt) => patchKontakt(updatedKontakt),
        [kontaktDefaultQueryKey, partnerDefaultQueryKey, stasjonDefaultQueryKey],
    );
