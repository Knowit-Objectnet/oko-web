import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import {
    ApiVektregistrering,
    ApiVektregistreringPost,
    postVektregistrering,
    vektregistreringDefaultQueryKey,
} from './VektregistreringService';

export const useAddVektregistrering = (): UseMutationResult<ApiVektregistrering, ApiError, ApiVektregistreringPost> =>
    useMutationWithInvalidation<ApiVektregistrering, ApiError, ApiVektregistreringPost>(
        (newVektregistrering) => postVektregistrering(newVektregistrering),
        [vektregistreringDefaultQueryKey],
    );
