import * as React from 'react';
import styled from 'styled-components';

const Group = styled.div`
    min-height: 40px;
    display: flex;
    flex-flow: column nowrap;
    border-bottom: solid 1px transparent;
`;

const Slot = styled.div`
    flex: 1 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 5px 0px 0px;
`;

interface GutterGroupProps {
    text?: string;
}

export const GutterGroup: React.FC<GutterGroupProps> = (props) => (
    <Group>
        <Slot>{props.text}</Slot>
    </Group>
);
