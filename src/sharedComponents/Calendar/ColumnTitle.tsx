import * as React from 'react';
import styled from 'styled-components';

const Group = styled.div`
    min-height: 40px;
    display: flex;
    flex-flow: column nowrap;
    border-bottom: solid 1px transparent;
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: ${(props) => props.theme.colors.LightBlue};
`;

const Slot = styled.div`
    flex: 1 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 5px 0px 0px;
`;

interface ColumnTitleProps {
    title?: string;
}

/*
 * Title component for a column in the calendar
 */
export const ColumnTitle: React.FC<ColumnTitleProps> = (props) => (
    <Group>
        <Slot>{props.title}</Slot>
    </Group>
);
