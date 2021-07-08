import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { ApiUtlysning, ApiUtlysningBatchPost, postBatchUtlysning, utlysningDefaultQueryKey } from './UtlysningService';

export const useBatchAddUtlysning = (): UseMutationResult<ApiUtlysning[], ApiError, ApiUtlysningBatchPost> =>
    useMutationWithInvalidation<ApiUtlysning[], ApiError, ApiUtlysningBatchPost>(
        (newUtlysninger) => postBatchUtlysning(newUtlysninger),
        [utlysningDefaultQueryKey],
    );
