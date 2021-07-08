import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import {
    ApiEkstraHenting,
    ApiEkstraHentingPost,
    ekstraHentingDefaultQueryKey,
    postEkstraHenting,
} from './EkstraHentingService';

export const useAddEkstraHenting = (): UseMutationResult<ApiEkstraHenting, ApiError, ApiEkstraHentingPost> =>
    useMutationWithInvalidation<ApiEkstraHenting, ApiError, ApiEkstraHentingPost>(
        (newHenteplan) => postEkstraHenting(newHenteplan),
        [ekstraHentingDefaultQueryKey],
    );
