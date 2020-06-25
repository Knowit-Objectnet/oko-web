import * as React from 'react';
import styled from 'styled-components';
import { useGetChangeLog } from '../../hooks/useGetChangeLog';

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
export const ChangeLog: React.FC<unknown> = () => {
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    const dummyChanges = ['A change was made'];
    let changes = useGetChangeLog();
    changes = changes.length !== 0 ? changes : dummyChanges;

    return <Wrapper></Wrapper>;
};
