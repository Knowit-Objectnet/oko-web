import { UseMutationResult } from 'react-query';
import { ApiKontakt, deleteKontakt, kontaktDefaultQueryKey } from './KontaktService';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { partnerDefaultQueryKey } from '../partner/PartnerService';

export const useDeleteKontakt = (): UseMutationResult<ApiKontakt, ApiError, string> =>
    useMutationWithInvalidation<ApiKontakt, ApiError, string>(
        (kontaktId) => deleteKontakt(kontaktId),
        [kontaktDefaultQueryKey, partnerDefaultQueryKey],
    );
