import * as React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '../../components/forms/deprecated/ErrorMessage';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Day = styled.div`
    margin-right: 10px;
    width: 40px;
`;

const Divider = styled.div`
    width: 100%;
`;

const TimeDivider = styled.span`
    margin: 0 20px;
`;

const ClosedInput = styled.input`
    zoom: 2;
`;

interface Props {
    day: string;
    closed: boolean;
}

export const OpeningHours: React.FC<Props> = (props) => {
    const { register } = useFormContext();

    return (
        <Wrapper>
            <InputRow>
                <Day>{`${props.day.slice(0, 1).toUpperCase()}${props.day.slice(1, 3)}`}</Day>
                {props.closed ? (
                    <Divider />
                ) : (
                    <div>
                        <input type="time" {...register(`${props.day}Start`)} />
                        <TimeDivider>-</TimeDivider>
                        <input type="time" {...register(`${props.day}Slutt`)} />
                    </div>
                )}
                <ClosedInput type="checkbox" {...register(`${props.day}Stengt`)} />
            </InputRow>
            <ErrorMessage name={`${props.day}Start`} />
            <ErrorMessage name={`${props.day}Slutt`} />
            <ErrorMessage name={`${props.day}Stengt`} />
        </Wrapper>
    );
};
