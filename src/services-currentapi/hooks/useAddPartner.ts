import { UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';
import { useMutationWithInvalidation } from './useMutationWithInvalidation';
import { ApiPartner, ApiPartnerPost, partnerDefaultQueryKey, postPartner } from '../PartnerService';

// TODO: we might want to use our own error-object here, not AxiosError
export const useAddPartner = (): UseMutationResult<ApiPartner, AxiosError, ApiPartnerPost> =>
    useMutationWithInvalidation<ApiPartner, AxiosError, ApiPartnerPost>(
        (newPartner) => postPartner(newPartner),
        partnerDefaultQueryKey,
    );
