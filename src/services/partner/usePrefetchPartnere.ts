import { useQueryClient } from 'react-query';
import { getPartnere, partnerDefaultQueryKey } from './PartnerService';

export const usePrefetchPartnere = (): void => {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery({
        // The second key (undefined) substitutes `params` object in `usePartnere`
        queryKey: [partnerDefaultQueryKey, undefined],
        queryFn: () => getPartnere(),
    });
};
