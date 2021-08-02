import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { ApiUtlysning, ApiUtlysningBatchPost, postBatchUtlysning, utlysningDefaultQueryKey } from './UtlysningService';
import { ekstraHentingDefaultQueryKey } from '../henting/EkstraHentingService';
import { hentingDefaultQueryKey } from '../henting/HentingService';

export const useBatchAddUtlysning = (): UseMutationResult<Array<ApiUtlysning>, ApiError, ApiUtlysningBatchPost> =>
    useMutationWithInvalidation<Array<ApiUtlysning>, ApiError, ApiUtlysningBatchPost>(
        (newUtlysninger) => postBatchUtlysning(newUtlysninger),
        [utlysningDefaultQueryKey, ekstraHentingDefaultQueryKey, hentingDefaultQueryKey],
    );
