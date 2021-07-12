import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import {
    ApiUtlysning,
    ApiUtlysningPartnerAccept,
    patchUtlysningPartnerAccept,
    utlysningDefaultQueryKey,
} from './UtlysningService';

export const usePartnerAcceptUtlysning = (): UseMutationResult<ApiUtlysning, ApiError, ApiUtlysningPartnerAccept> =>
    useMutationWithInvalidation<ApiUtlysning, ApiError, ApiUtlysningPartnerAccept>(
        (utlysningAccept) => patchUtlysningPartnerAccept(utlysningAccept),
        [utlysningDefaultQueryKey],
    );
