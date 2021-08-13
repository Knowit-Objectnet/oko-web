import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import {
    ApiVektregistrering,
    ApiVektregistreringBatchPatch,
    patchBatchVektregistrering,
    vektregistreringDefaultQueryKey,
} from './VektregistreringService';
import { hentingDefaultQueryKey } from '../henting/HentingService';

export const useBatchUpdateVektregistrering = (): UseMutationResult<
    ApiVektregistrering[],
    ApiError,
    ApiVektregistreringBatchPatch
> =>
    useMutationWithInvalidation<ApiVektregistrering[], ApiError, ApiVektregistreringBatchPatch>(
        (updatedVektregistreringer) => patchBatchVektregistrering(updatedVektregistreringer),
        [vektregistreringDefaultQueryKey, hentingDefaultQueryKey],
    );
