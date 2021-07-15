import { useQueryClient } from 'react-query';
import { getVektregistreringer, vektregistreringDefaultQueryKey } from './VektregistreringService';

export const usePrefetchVektregistrering = (): void => {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery({
        // The second key (undefined) substitutes `params` object in `useVektregistrering`
        queryKey: [vektregistreringDefaultQueryKey, undefined],
        queryFn: () => getVektregistreringer(),
    });
};
