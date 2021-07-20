import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { ApiVerifiseringStatus, ApiVerifiserPost, kontaktDefaultQueryKey, verifiser } from './KontaktService';
import { partnerDefaultQueryKey } from '../partner/PartnerService';
import { stasjonDefaultQueryKey } from '../stasjon/StasjonService';

export const useVerifiser = (): UseMutationResult<ApiVerifiseringStatus, ApiError, ApiVerifiserPost> =>
    useMutationWithInvalidation<ApiVerifiseringStatus, ApiError, ApiVerifiserPost>(
        (verifisering) => verifiser(verifisering),
        [kontaktDefaultQueryKey, partnerDefaultQueryKey, stasjonDefaultQueryKey],
    );
