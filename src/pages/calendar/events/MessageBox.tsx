import * as React from 'react';
import styled from 'styled-components';
import { InfoCircle } from '@styled-icons/boxicons-solid/InfoCircle';
import { Colors } from '../../../types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: auto;
    background-color: ${Colors.Yellow};
    width: 300px;
    padding: 10px;
    margin-bottom: 10px;
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

const Text = styled.div`
    flex: 1;
`;

const DateRange = styled.div`
    font-size: 12px;
    display: flex;
    align-items: end;
    justify-content: flex-end;
`;

interface MessageInfo {
    start?: Date;
    end?: Date;
    text?: string;
}

/**
 * Message box shown in the event component to display a message from the partners.
 */
export const MessageBox: React.FC<MessageInfo> = (props) => {
    const getDateTimeString = (start?: Date, end?: Date) => {
        if (start && end) {
            const startString = props.start?.toLocaleString('no-NB', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
            });
            const endString = props.end?.toLocaleString('no-NB', { month: 'numeric', day: 'numeric', year: 'numeric' });
            return startString + ' - ' + endString;
        }
        return '';
    };

    return (
        <Wrapper>
            <Title>
                <Info size="1em" />
                NB
            </Title>
            <Text>{props.text || 'Ingen melding'}</Text>
            <DateRange>{getDateTimeString(props.start, props.end)}</DateRange>
        </Wrapper>
    );
};
