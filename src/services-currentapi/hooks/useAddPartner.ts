import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from './useMutationWithInvalidation';
import { ApiPartner, ApiPartnerPost, partnerDefaultQueryKey, postPartner } from '../PartnerService';
import { ApiError } from '../../services/httpClient';

export const useAddPartner = (): UseMutationResult<ApiPartner, ApiError, ApiPartnerPost> =>
    useMutationWithInvalidation<ApiPartner, ApiError, ApiPartnerPost>(
        (newPartner) => postPartner(newPartner),
        partnerDefaultQueryKey,
    );
