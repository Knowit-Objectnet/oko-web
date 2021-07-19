import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import {
    ApiVektregistrering,
    deleteVektregistrering,
    vektregistreringDefaultQueryKey,
} from './VektregistreringService';

export const useDeleteVektregistrering = (): UseMutationResult<ApiVektregistrering, ApiError, string> =>
    useMutationWithInvalidation<ApiVektregistrering, ApiError, string>(
        (vektregistreringId) => deleteVektregistrering(vektregistreringId),
        [vektregistreringDefaultQueryKey],
    );
