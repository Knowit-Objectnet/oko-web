import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiPartner, ApiPartnerPatch, partnerDefaultQueryKey, patchPartner } from './PartnerService';
import { ApiError } from '../httpClient';

export const useUpdatePartner = (): UseMutationResult<ApiPartner, ApiError, ApiPartnerPatch> =>
    useMutationWithInvalidation<ApiPartner, ApiError, ApiPartnerPatch>(
        (updatedPartner) => patchPartner(updatedPartner),
        [partnerDefaultQueryKey],
    );
