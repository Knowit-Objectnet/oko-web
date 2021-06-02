import { useQueryClient } from 'react-query';
import { getPartnere, partnerDefaultQueryKey } from './PartnerService';

export const usePrefetchPartnere = (): void => {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery({
        queryKey: [partnerDefaultQueryKey],
        queryFn: () => getPartnere(),
    });
};
