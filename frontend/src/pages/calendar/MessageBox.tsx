import * as React from 'react';
import styled from 'styled-components';
import { InfoCircle } from '@styled-icons/boxicons-solid/InfoCircle';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: auto;
    background-color: #dddddd;
    border-radius: 5px;
    max-width: 220px;
    max-height: 220px;
    padding: 10px 25px;
`;

const Info = styled(InfoCircle)`
    margin-right: 5px;
`;

const Title = styled.span`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 19px;
    line-height: 22px;
`;

const DateRange = styled.div`
    margin-bottom: 10px;
`;

interface MessageInfo {
    start: Date;
    end: Date;
    text: string;
}

/**
 * Message box shown in the event component to display a message from the partners.
 */
export const MessageBox: React.FC<MessageInfo> = (props) => (
    <Wrapper>
        <Title>
            <Info size="1em" />
            NB
        </Title>
        <DateRange>
            {`
                ${props.start.toLocaleString('no-NB', { month: 'numeric', day: 'numeric', year: 'numeric' })}
                -
                ${props.end.toLocaleString('no-NB', { month: 'numeric', day: 'numeric', year: 'numeric' })}
            `}
        </DateRange>
        <p>{props.text}</p>
    </Wrapper>
);
