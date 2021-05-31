import { QueryObserverResult, useQuery } from 'react-query';
import { ApiStasjon, ApiStasjonParams, getStasjoner, stasjonDefaultQueryKey } from '../AktorService';

export const useStasjoner = (params: ApiStasjonParams = {}): QueryObserverResult<Array<ApiStasjon>> => {
    return useQuery<Array<ApiStasjon>>({
        queryKey: [stasjonDefaultQueryKey],
        queryFn: () => getStasjoner(params),
    });
};
