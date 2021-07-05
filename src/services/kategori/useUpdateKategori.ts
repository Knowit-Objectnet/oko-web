import { UseMutationResult } from 'react-query';
import { useMutationWithInvalidation } from '../useMutationWithInvalidation';
import { ApiError } from '../httpClient';
import { ApiKategori, ApiKategoriPatch, kategoriDefaultQueryKey, patchKategori } from './KategoriService';

export const useUpdateKategori = (): UseMutationResult<ApiKategori, ApiError, ApiKategoriPatch> =>
    useMutationWithInvalidation<ApiKategori, ApiError, ApiKategoriPatch>(
        (updatedKategori) => patchKategori(updatedKategori),
        [kategoriDefaultQueryKey],
    );
