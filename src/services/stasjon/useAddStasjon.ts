import { UseMutationResult } from 'react-query';
import { ApiStasjon, ApiStasjonPost, postStasjon, stasjonDefaultQueryKey } from './StasjonService';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';

export const useAddStasjon = (): UseMutationResult<ApiStasjon, ApiError, ApiStasjonPost> =>
    useMutationWithInvalidation<ApiStasjon, ApiError, ApiStasjonPost>(
        (newStasjon) => postStasjon(newStasjon),
        stasjonDefaultQueryKey,
    );
