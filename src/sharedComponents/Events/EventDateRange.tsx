import * as React from 'react';
import styled from 'styled-components';
import { DatePicker } from '../forms/DatePicker';
import { ErrorMessage } from '../forms/ErrorMessage';

const Wrapper = styled.div`
    width: 100%;
`;

const Range = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    &:not(:last-child) {
        margin-bottom: 10px;
    }
`;

const Span = styled.span`
    padding: 0px 15px;
`;

interface Props {
    start: Date;
    end: Date;
}

export const EventDateRange: React.FC<Props> = (props) => {
    return (
        <Wrapper>
            <Range>
                <DatePicker name="dateRange.start" defaultValue={props.start} />
                <Span>til</Span>
                <DatePicker name="dateRange.end" defaultValue={props.end} />
            </Range>
            <ErrorMessage name="dateRange.start" />
            <ErrorMessage name="dateRange.end" />
        </Wrapper>
    );
};
