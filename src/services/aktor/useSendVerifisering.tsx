import { useMutation, UseMutationResult } from 'react-query';
import { ApiError } from '../httpClient';
import { ApiVerifiseringMelding, sendVerifisering } from './KontaktService';

export const useSendVerifisering = (): UseMutationResult<ApiVerifiseringMelding, ApiError, string> =>
    useMutation<ApiVerifiseringMelding, ApiError, string>((kontaktId) => sendVerifisering(kontaktId));
