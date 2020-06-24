import * as React from 'react';
import styled from 'styled-components';
import { useGetChangeLog } from '../../hooks/useGetChangeLog';

const Wrapper = styled.div`
    background-color: #f2f1f1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    min-height: 110px;
`;

export const ChangeLog: React.FC<unknown> = () => {
    const dummyChanges = ['A change was made'];
    let changes = useGetChangeLog();
    changes = changes.length !== 0 ? changes : dummyChanges;

    return <Wrapper></Wrapper>;
};
