import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { ApiKategori, deleteKategori, kategoriDefaultQueryKey } from './KategoriService';

export const useDeleteKategori = (): UseMutationResult<ApiKategori, ApiError, string> =>
    useMutationWithInvalidation<ApiKategori, ApiError, string>(
        (kategoriId) => deleteKategori(kategoriId),
        [kategoriDefaultQueryKey],
    );
