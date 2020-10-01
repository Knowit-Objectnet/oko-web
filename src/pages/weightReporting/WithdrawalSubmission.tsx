import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Report } from '../../types';
import Pencil from '../../assets/Pencil.svg';
import { types, useAlert } from 'react-alert';
import { useReports } from '../../services/useReports';

const Wrapper = styled.div`
    display: flex;
    margin-bottom: 2px;
`;

interface WithdrawalWeightProps {
    weight: number | null;
}

const WithdrawalDate = styled.div<WithdrawalWeightProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => (props.weight ? props.theme.colors.LightGreen : props.theme.colors.Red)};
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
    background-color: ${(props) => (props.weight ? props.theme.colors.LightGreen : props.theme.colors.Red)};
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
    border: solid 2px ${(props) => props.theme.colors.Red};
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
        border: 2px solid ${(props) => props.theme.colors.Red};
        -webkit-box-shadow: 0px 0px 5px ${(props) => props.theme.colors.Red};
        box-shadow: 0px 0px 5px ${(props) => props.theme.colors.Red};
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
`;

const Button = styled.button`
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.Red};
`;

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: auto;
    min-width: 300px;
    height: 50px;
    background-color: ${(props) => props.theme.colors.LightBeige};
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
    fill: ${(props) => props.theme.colors.Black};
    margin-right: 20px;
`;

interface WithdrawalProps {
    withdrawal: Report;
}

/**
 * Event option that allows the user to choose a weight for the event.
 */
export const WithdrawalSubmission: React.FC<WithdrawalProps> = ({ withdrawal }) => {
    // Alert dispatcher
    const alert = useAlert();
    const { updateReport } = useReports();

    // State
    const [weight, setWeight] = useState<number | ''>(withdrawal.weight || '');
    const [editing, setEditing] = useState(withdrawal.weight === null);

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
        if (weight === withdrawal.weight) {
            setEditing(false);
            // If the weight isnt an empty string or the old weight then send an
            // api request as the weight has changed
        } else if (weight) {
            setEditing(false);
            try {
                // Post update to API
                await updateReport(withdrawal.reportId, weight);

                // Give user feedback
                alert.show('Uttaket ble oppdatert suksessfullt.', { type: types.SUCCESS });
            } catch (err) {
                alert.show('Noe gikk kalt, uttaket ble ikke oppdatert.', { type: types.ERROR });
            }
        }
    };

    // Button function to start edit mode
    const onEditButtonClick = () => {
        setEditing(true);
    };

    const startDate = new Date(withdrawal.startDateTime);
    const endDate = new Date(withdrawal.endDateTime);

    return (
        <Wrapper>
            <WithdrawalDate weight={withdrawal.weight}>
                <DateTime>
                    <b>Dato: </b>
                    {startDate
                        .toLocaleString('nb-NO', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            weekday: 'short',
                        })
                        .slice(0, 1)
                        .toUpperCase() +
                        startDate
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
                    {`${startDate.getHours().toString().padStart(2, '0')}:${startDate
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')} - ${endDate
                        .getHours()
                        .toString()
                        .padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`}
                </DateTime>
            </WithdrawalDate>
            <WithdrawalLocation weight={withdrawal.weight}>{withdrawal.station.name}</WithdrawalLocation>
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
                    <BoxText>{withdrawal.weight} kg</BoxText>
                    <EditIcon onClick={onEditButtonClick} />
                </Box>
            )}
        </Wrapper>
    );
};
