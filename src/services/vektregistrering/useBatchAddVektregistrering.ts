import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import {
    ApiVektregistrering,
    ApiVektregistreringBatchPost,
    postBatchVektregistrering,
    vektregistreringDefaultQueryKey,
} from './VektregistreringService';
import { hentingDefaultQueryKey } from '../henting/HentingService';

export const useBatchAddVektregistrering = (): UseMutationResult<
    ApiVektregistrering[],
    ApiError,
    ApiVektregistreringBatchPost
> =>
    useMutationWithInvalidation<ApiVektregistrering[], ApiError, ApiVektregistreringBatchPost>(
        (newVektregistreringer) => postBatchVektregistrering(newVektregistreringer),
        [vektregistreringDefaultQueryKey, hentingDefaultQueryKey],
    );
