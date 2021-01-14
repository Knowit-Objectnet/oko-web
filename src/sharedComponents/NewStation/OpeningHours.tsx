import * as React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import ErrorText from '../forms/ErrorText';

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
    margin: 0px 20px;
`;

const ClosedInput = styled.input`
    zoom: 2;
`;

interface Props {
    day: string;
    closed: boolean;
}

export const OpeningHours: React.FC<Props> = (props) => {
    const { register, errors } = useFormContext();

    return (
        <Wrapper>
            <InputRow>
                <Day>{`${props.day.slice(0, 1).toUpperCase()}${props.day.slice(1, 3)}`}</Day>
                {props.closed ? (
                    <Divider></Divider>
                ) : (
                    <div>
                        <input type="time" name={`${props.day}Start`} ref={register} />
                        <TimeDivider>-</TimeDivider>
                        <input type="time" name={`${props.day}Slutt`} ref={register} />
                    </div>
                )}
                <ClosedInput type="checkbox" name={`${props.day}Stengt`} ref={register} />
            </InputRow>
            <ErrorMessage errors={errors} name={`${props.day}Start`} as={ErrorText} />
            <ErrorMessage errors={errors} name={`${props.day}Slutt`} as={ErrorText} />
            <ErrorMessage errors={errors} name={`${props.day}Stengt`} as={ErrorText} />
        </Wrapper>
    );
};
