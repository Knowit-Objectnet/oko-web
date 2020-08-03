import * as React from 'react';
import styled from 'styled-components';
import { PropsWithChildren, useState } from 'react';
import { Colors, ApiLocation } from '../../types';
import Pencil from '../../assets/Pencil.svg';

const Wrapper = styled.div`
    display: flex;
    margin-bottom: 2px;
`;

interface WithdrawalWeightProps {
    weight?: number;
}

const WithdrawalDate = styled.div<WithdrawalWeightProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => (props.weight ? Colors.LightGreen : Colors.Red)};
    min-width: 470px;
    height: 50px;
    margin-right: 2px;
    padding: 5px 14px;
    box-sizing: border-box;
`;

const DateTime = styled.span`
    white-space: nowrap;

    &:first-child {
        margin-right: 10px;
    }
`;

const WithdrawalLocation = styled.div<WithdrawalWeightProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.weight ? Colors.LightGreen : Colors.Red)};
    min-width: 150px;
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

const Suffix = styled.label`
    height: 100%;
    flex: 1;
    display: flex;
    position: relative;
    border: solid 2px ${Colors.Red};
    border-right: none;
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

    &:focus-within {
        outline: none;
        border: 2px solid ${Colors.Red};
        -webkit-box-shadow: 0px 0px 5px ${Colors.Red};
        box-shadow: 0px 0px 5px ${Colors.Red};
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
    outline: none;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    width: 50px;
    height: 50px;

    &:after {
        content: '';
        background: ${Colors.Red};
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 50%;
    }

    &:before {
        content: '';
        background: ${Colors.Red};
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        width: 50%;
    }
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
    id: number;
    weight?: number;
    start: Date;
    end: Date;
    location: number;
    locations?: Array<ApiLocation>;
    onSubmit: (weight: number, id: number) => void;
}

/**
 * Event option that allows the user to choose a weight for the event.
 */
export const MemoWithdrawalSubmission: React.FC<WithdrawalProps> = (props) => {
    // State
    const [weight, setWeight] = useState<number | ''>(props.weight || '');
    const [editing, setEditing] = useState(props.weight === null);

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
    const onSubmitClick = async () => {
        // If the new weight is the same as the old weight then turn off editing
        // without sending an api request as nothing is changed
        if (weight === props.weight) {
            setEditing(false);
            // If the weight isnt an empty string or the old weight then send an
            // api request as the weight has changed
        } else if (weight) {
            await props.onSubmit(weight, props.id);
            setEditing(false);
        }
    };

    // Button function to start edit mode
    const onEditButtonClick = () => {
        setEditing(true);
    };

    return (
        <Wrapper>
            <WithdrawalDate weight={props.weight}>
                <DateTime>
                    <b>Dato: </b>
                    {props.start
                        .toLocaleString('nb-NO', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            weekday: 'short',
                        })
                        .slice(0, 1)
                        .toUpperCase() +
                        props.start
                            .toLocaleString('nb-NO', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                                weekday: 'short',
                            })
                            .slice(1)}
                </DateTime>
                <DateTime>
                    <b>Klokken: </b>
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
                </DateTime>
            </WithdrawalDate>
            <WithdrawalLocation weight={props.weight}>
                {props.locations && props.locations.find((location) => location.id === props.location)?.name}
            </WithdrawalLocation>
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
                    <ButtonWrapper>
                        <Button type="submit" onClick={onSubmitClick} disabled={weight === ''}>
                            OK
                        </Button>
                    </ButtonWrapper>
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
        prevProps.end.getTime() === nextProps.end.getTime() &&
        prevProps.locations === nextProps.locations
    );
};

export const WithdrawalSubmission = React.memo(MemoWithdrawalSubmission, areEqual);
