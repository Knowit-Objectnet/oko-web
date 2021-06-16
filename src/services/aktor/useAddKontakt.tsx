import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { ApiKontakt, ApiKontaktPost, kontaktDefaultQueryKey, postKontakt } from './KontaktService';
import { partnerDefaultQueryKey } from '../partner/PartnerService';
import { stasjonDefaultQueryKey } from '../stasjon/StasjonService';

export const useAddKontakt = (): UseMutationResult<ApiKontakt, ApiError, ApiKontaktPost> =>
    useMutationWithInvalidation<ApiKontakt, ApiError, ApiKontaktPost>(
        (newKontakt) => postKontakt(newKontakt),
        [kontaktDefaultQueryKey, partnerDefaultQueryKey, stasjonDefaultQueryKey],
    );
