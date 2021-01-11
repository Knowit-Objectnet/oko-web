import { useKeycloak } from '@react-keycloak/web';
import { QueryObserverResult, useQuery } from 'react-query';
import { ApiEvent, ApiEventParams, getEvents, eventsDefaultQueryKey } from '../EventService';

export const useEvents = (params: ApiEventParams = {}): QueryObserverResult<Array<ApiEvent>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiEvent>>({
        queryKey: [eventsDefaultQueryKey, params],
        queryFn: () => getEvents(params, keycloak.token),
    });
};
