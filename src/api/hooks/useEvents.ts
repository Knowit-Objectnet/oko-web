import { useKeycloak } from '@react-keycloak/web';
import { QueryResult, useQuery } from 'react-query';
import { ApiEvent, ApiEventParams, getEvents, eventsDefaultQueryKey } from '../EventService';

export const useEvents = (params: ApiEventParams = {}): QueryResult<Array<ApiEvent>> => {
    const [keycloak] = useKeycloak();

    return useQuery<Array<ApiEvent>>({
        queryKey: [eventsDefaultQueryKey, params, keycloak.token],
        queryFn: getEvents,
    });
};
