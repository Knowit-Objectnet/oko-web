import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { PostToAPI } from '../../utils/PostToAPi';
import { useKeycloak } from '@react-keycloak/web';
import { Colors } from '../../types';

const Wrapper = styled.div`
    display: flex;
    margin-bottom: 32px;
`;

interface WithdrawalDateProps {
    weight?: number;
}

const WithdrawalDate = styled.div<WithdrawalDateProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.weight ? Colors.Green : Colors.Red)};
    min-width: 150px;
    height: 50px;
    margin-right: 40px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    min-width: 300px;
`;

const Suffix = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    position: relative;

    &::after {
        position: absolute;
        top: 25%;
        right: 0.5em;
        transition: all 0.05s ease-in-out;
    }

    &:hover::after,
    &:focus-within::after {
        right: 1.5em;
        top: 25%;
    }

    &::after {
        content: 'Kg';
    }
`;

const Input = styled.input`
    flex: auto;
    border: none;
    text-indent: 12px;
    font-size: 20px;
    line-height: 28px;
`;

const Button = styled.button`
    border: none;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: ${Colors.Red};
`;

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 300px;
    height: 50px;
    background-color: ${Colors.White};
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
`;

interface WithdrawalProps {
    id: string;
    weight?: number;
    start: Date;
    end: Date;
    onSubmit: (weight: number, id: string) => void;
}

/**
 * Event option that allows the user to choose a weight for the event.
 */
export const WithdrawalSubmission: React.FC<WithdrawalProps> = (props) => {
    // State
    const [weight, setWeight] = useState<number | ''>('');

    // On change function for the input element
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const val = e.currentTarget.value;
        setWeight(val === '' ? val : parseInt(e.currentTarget.value));
    };

    // Prevent user from using negative numbers, punctuation, and other special characters
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.persist();
        const val = e.charCode;
        if ((val < 48 || val > 57) && val !== 44) e.preventDefault();
    };

    // On click function for the OK button
    const onClick = () => {
        if (weight) {
            props.onSubmit(weight, props.id);
        }
    };

    return (
        <Wrapper>
            <WithdrawalDate weight={props.weight}>
                <span>
                    {props.start.toLocaleString('no-NB', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        weekday: 'long',
                    })}
                </span>
                <span>
                    {`${props.start
                        .getHours()
                        .toString()
                        .padStart(2, '0')}:${props.start
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')} - ${props.end
                        .getHours()
                        .toString()
                        .padStart(2, '0')}:${props.end.getMinutes().toString().padStart(2, '0')}`}
                </span>
            </WithdrawalDate>
            {props.weight ? (
                <Box>{props.weight} kg</Box>
            ) : (
                <InputWrapper>
                    <Suffix>
                        <Input
                            type="number"
                            name="weight"
                            placeholder="Skriv inn vektuttak"
                            value={weight}
                            min={0}
                            onChange={onChange}
                            onKeyPress={onKeyDown}
                        />
                    </Suffix>
                    <Button type="submit" onClick={onClick} disabled={weight === undefined}>
                        OK
                    </Button>
                </InputWrapper>
            )}
        </Wrapper>
    );
};
