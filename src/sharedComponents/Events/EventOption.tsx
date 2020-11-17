import * as React from 'react';
import styled from 'styled-components';

const Option = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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

export const EventOption: React.FC<Props> = (props) => (
    <Option>
        {props.icon && <props.icon height="1.5em" />}
        <OptionInfo icon={props.icon}>{props.children}</OptionInfo>
    </Option>
);
