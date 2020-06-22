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
`;

interface EventOptionProps {
    children: React.ReactNode;
    icon: React.ElementType;
}

export const EventOption: React.FC<EventOptionProps> = (props) => (
    <Option>
        <props.icon size="1.5em" />
        <OptionInfo>{props.children}</OptionInfo>
    </Option>
);
