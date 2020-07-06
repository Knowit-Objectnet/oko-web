import * as React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import {useKeycloak} from "@react-keycloak/web";

const Wrapper = styled.div`
    background-color: #f2f1f1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    min-height: 110px;
`;

/**
 * A log that shows changes of events at the different locations.
 * Only visible for Oslo kommune
 */
export const ChangeLog: React.FC = () => {
    const { keycloak } = useKeycloak();
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    let { data: changes } = useSWR(['/api/log/changes', keycloak.token], fetcher);
    changes = changes && changes.length !== 0 ? changes : ['A change was made'];

    return <Wrapper></Wrapper>;
};
