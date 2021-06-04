import { useQueryClient } from 'react-query';
import { getStasjoner, stasjonDefaultQueryKey } from './StasjonService';

export const usePrefetchStasjoner = (): void => {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery({
        // The second key (undefined) substitutes `params` object in `useStasjoner`
        queryKey: [stasjonDefaultQueryKey, undefined],
        queryFn: () => getStasjoner(),
    });
};
