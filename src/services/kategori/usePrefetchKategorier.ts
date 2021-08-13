import { useQueryClient } from 'react-query';
import { getKategorier, kategoriDefaultQueryKey } from './KategoriService';

export const usePrefetchKategorier = (): void => {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery({
        // The second key (undefined) substitutes `params` object in `useKategorier`
        queryKey: [kategoriDefaultQueryKey, undefined],
        queryFn: () => getKategorier(),
    });
};
