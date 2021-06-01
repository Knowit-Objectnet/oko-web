import { UseMutationResult } from 'react-query';
import { ApiStasjon, ApiStasjonPost, postStasjon, stasjonDefaultQueryKey } from '../StasjonService';
import { AxiosError } from 'axios';
import { useMutationWithInvalidation } from './useMutationWithInvalidation';

// TODO: we might want to use our own error-object here, not AxiosError
export const useAddStasjon = (): UseMutationResult<ApiStasjon, AxiosError, ApiStasjonPost> =>
    useMutationWithInvalidation<ApiStasjon, AxiosError, ApiStasjonPost>(
        (newStasjon) => postStasjon(newStasjon),
        stasjonDefaultQueryKey,
    );
