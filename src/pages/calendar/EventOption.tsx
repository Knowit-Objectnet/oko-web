import * as React from 'react';
import styled from 'styled-components';

const Option = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 42px;
`;

const OptionInfo = styled.div`
    margin-left: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface EventOptionProps {
    children: React.ReactNode;
    icon: React.ElementType;
}

/**
 * A general Event option that can be specialized for a new event option
 */
export const EventOption: React.FC<EventOptionProps> = (props) => (
    <Option>
        <props.icon size="1.5em" />
        <OptionInfo>{props.children}</OptionInfo>
    </Option>
);