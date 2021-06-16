import { UseMutationResult } from 'react-query';
import { ApiStasjon, ApiStasjonPatch, patchStasjon, stasjonDefaultQueryKey } from './StasjonService';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';

export const useUpdateStasjon = (): UseMutationResult<ApiStasjon, ApiError, ApiStasjonPatch> =>
    useMutationWithInvalidation<ApiStasjon, ApiError, ApiStasjonPatch>(
        (updatedStasjon) => patchStasjon(updatedStasjon),
        [stasjonDefaultQueryKey],
    );
