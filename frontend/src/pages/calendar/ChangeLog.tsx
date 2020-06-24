import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: #f2f1f1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    min-height: 110px;
`;

interface ChangeLogProps {
    changes: Array<string>;
}

export const ChangeLog: React.FC<ChangeLogProps> = (props) => {
    return <Wrapper></Wrapper>;
};
