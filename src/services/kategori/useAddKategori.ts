import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { ApiKategori, ApiKategoriPost, kategoriDefaultQueryKey, postKategori } from './KategoriService';

export const useAddKategori = (): UseMutationResult<ApiKategori, ApiError, ApiKategoriPost> =>
    useMutationWithInvalidation<ApiKategori, ApiError, ApiKategoriPost>(
        (newKategori) => postKategori(newKategori),
        [kategoriDefaultQueryKey],
    );
