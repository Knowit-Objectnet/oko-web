import * as React from 'react';
import styled from 'styled-components';

const Option = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    &:not(:last-child) {
        margin-bottom: 10px;
    }
`;

interface Props {
    icon?: React.ElementType;
}

const OptionInfo = styled.div<Props>`
    margin-left: ${(props) => (props.icon ? '36px' : '0')};
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

interface EventOptionProps {
    icon?: React.ElementType;
}

/**
 * A general Event option that can be specialized for a new event option
 */
export const EventOption: React.FC<EventOptionProps> = (props) => (
    <Option>
        {props.icon && <props.icon height="1.5em" />}
        <OptionInfo icon={props.icon}>{props.children}</OptionInfo>
    </Option>
);
