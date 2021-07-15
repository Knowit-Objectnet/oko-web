import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import {
    ApiVektregistrering,
    ApiVektregistreringPatch,
    patchVektregistrering,
    vektregistreringDefaultQueryKey,
} from './VektregistreringService';

export const useUpdateVektregistrering = (): UseMutationResult<
    ApiVektregistrering,
    ApiError,
    ApiVektregistreringPatch
> =>
    useMutationWithInvalidation<ApiVektregistrering, ApiError, ApiVektregistreringPatch>(
        (updatedVektregistrering) => patchVektregistrering(updatedVektregistrering),
        [vektregistreringDefaultQueryKey],
    );
