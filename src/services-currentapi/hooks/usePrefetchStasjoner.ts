import { useQueryClient } from 'react-query';
import { getStasjoner, stasjonDefaultQueryKey } from '../StasjonService';

export const usePrefetchStasjoner = (): void => {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery({
        queryKey: [stasjonDefaultQueryKey],
        queryFn: () => getStasjoner(),
    });
};
