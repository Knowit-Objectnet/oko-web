import * as React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
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

const Input = styled.input`
    flex: 1;
    height: 30px;
`;

const Span = styled.span`
    padding: 0 15px;
`;

export const EventTimeRange: React.FC = () => {
    const { register } = useFormContext();

    return (
        <Wrapper>
            <Range>
                <Input type="time" {...register('timeRange.start')} />
                <Span>til</Span>
                <Input type="time" {...register('timeRange.end')} />
            </Range>
            <ErrorMessage name="timeRange.start" />
            <ErrorMessage name="timeRange.end" />
        </Wrapper>
    );
};