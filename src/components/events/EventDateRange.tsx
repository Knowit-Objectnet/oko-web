import * as React from 'react';
import styled from 'styled-components';
import { DatePickerOld } from '../forms/DatePickerOld';
import { ErrorMessage } from '../forms/ErrorMessage';

const Wrapper = styled.div`
    width: 100%;
`;

const Range = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &:not(:last-child) {
        margin-bottom: 10px;
    }
`;

const Span = styled.span`
    padding: 0px 15px;
`;

export const EventDateRange: React.FC = () => {
    return (
        <Wrapper>
            <Range>
                <DatePickerOld name="dateRange.start" />
                <Span>til</Span>
                <DatePickerOld name="dateRange.end" />
            </Range>
            <ErrorMessage name="dateRange.start" />
            <ErrorMessage name="dateRange.end" />
        </Wrapper>
    );
};
