import * as React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import ErrorText from '../../sharedComponents/forms/ErrorText';
import format from 'date-fns/format';

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
    min: Date;
    max: Date;
}

export const OpeningHours: React.FC<Props> = (props) => {
    const { register, errors } = useFormContext();

    return (
        <Wrapper>
            {(errors[`${props.day}Start`] || errors[`${props.day}Slutt`] || errors[`${props.day}Stengt`]) && (
                <ErrorText
                    error={
                        errors[`${props.day}Start`]?.message ||
                        errors[`${props.day}Slutt`]?.message ||
                        errors[`${props.day}Stengt`]?.message
                    }
                />
            )}
            <InputRow>
                <Day>{`${props.day.slice(0, 1).toUpperCase()}${props.day.slice(1, 3)}`}</Day>
                {props.closed ? (
                    <Divider></Divider>
                ) : (
                    <div>
                        <input
                            type="time"
                            name={`${props.day}Start`}
                            ref={register}
                            defaultValue={format(props.min, 'HH:mm')}
                        />
                        <TimeDivider>-</TimeDivider>
                        <input
                            type="time"
                            name={`${props.day}Slutt`}
                            ref={register}
                            defaultValue={format(props.max, 'HH:mm')}
                        />
                    </div>
                )}
                <ClosedInput type="checkbox" name={`${props.day}Stengt`} ref={register} />
            </InputRow>
        </Wrapper>
    );
};
