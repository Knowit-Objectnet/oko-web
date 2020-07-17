import * as React from 'react';
import styled from 'styled-components';
import {PropsWithChildren, useState} from 'react';
import { Colors } from '../../types';
import Pencil from '../../assets/Pencil.svg';

const Wrapper = styled.div`
    display: flex;
    margin-bottom: 2px;
`;

interface WithdrawalDateProps {
    weight?: number;
}

const WithdrawalDate = styled.div<WithdrawalDateProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.weight ? Colors.LightGreen : Colors.Red)};
    min-width: 170px;
    height: 50px;
    margin-right: 2px;
    padding: 5px;
    box-sizing: border-box;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    min-width: 300px;
    flex: 1;
`;

const Suffix = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    position: relative;
    border: solid 2px ${Colors.Red};
    box-sizing: border-box;

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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${Colors.Red};
`;

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: auto;
    min-width: 300px;
    height: 50px;
    background-color: ${Colors.LightBeige};
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
`;

const BoxText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const EditIcon = styled(Pencil)`
    height: 1em;
    fill: ${Colors.Black};
    margin-right: 20px;
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
export const MemoWithdrawalSubmission: React.FC<WithdrawalProps> = (props) => {
    // State
    const [weight, setWeight] = useState<number | ''>(props.weight || '');
    const [editing, setEditing] = useState(props.weight === undefined);

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
    const onSubmitClick = () => {
        // If the new weight is the same as the old weight then turn off editing
        // without sending an api request as nothing is changed
        if (weight === props.weight) {
            setEditing(false);
            // If the weight isnt an empty string or the old weight then send an
            // api request as the weight has changed
        } else if (weight) {
            props.onSubmit(weight, props.id);
        }
    };

    // Button function to start edit mode
    const onEditButtonClick = () => {
        setEditing(true);
    };

    return (
        <Wrapper>
            <WithdrawalDate weight={props.weight}>
                <span>
                    {props.start.toLocaleString('nb-NO', {
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
            {editing ? (
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
                    <Button type="submit" onClick={onSubmitClick} disabled={weight === ''}>
                        OK
                    </Button>
                </InputWrapper>
            ) : (
                <Box>
                    <BoxText>{props.weight} kg</BoxText>
                    <EditIcon onClick={onEditButtonClick} />
                </Box>
            )}
        </Wrapper>
    );
};

const areEqual = (
    prevProps: Readonly<PropsWithChildren<WithdrawalProps>>,
    nextProps: Readonly<PropsWithChildren<WithdrawalProps>>,
) => {
    return (
        prevProps.weight === nextProps.weight &&
        prevProps.id === nextProps.id &&
        prevProps.start.getTime() === nextProps.start.getTime() &&
        prevProps.end.getTime() === nextProps.end.getTime()
    );
};

export const WithdrawalSubmission = React.memo(MemoWithdrawalSubmission, areEqual);
