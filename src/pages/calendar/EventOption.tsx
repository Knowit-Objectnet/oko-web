import * as React from 'react';
import styled from 'styled-components';

const Option = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 42px;
`;

interface OptionInfoProps {
    icon?: React.ElementType;
}

const OptionInfo = styled.div<OptionInfoProps>`
    margin-left: ${(props) => (props.icon ? '36px' : '0')};
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

interface EventOptionProps {
    children: React.ReactNode;
    icon?: React.ElementType;
}

/**
 * A general Event option that can be specialized for a new event option
 */
export const EventOption: React.FC<EventOptionProps> = (props) => (
    <Option>
        {props.icon ? <props.icon size="1.5em" /> : null}
        <OptionInfo icon={props.icon}>{props.children}</OptionInfo>
    </Option>
);
