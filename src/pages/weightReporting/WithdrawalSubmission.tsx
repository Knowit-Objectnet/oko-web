import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Pencil from '../../assets/Pencil.svg';
import { queryCache, useMutation } from 'react-query';
import { ApiReport, ApiReportPatch, patchReport, reportsDefaultQueryKey } from '../../api/ReportService';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { format, formatISO } from 'date-fns';
import { nb } from 'date-fns/locale';

const Wrapper = styled.li`
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

interface Props {
    report: ApiReport;
}

export const WithdrawalSubmission: React.FC<Props> = ({ report }) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const [weight, setWeight] = useState<number | ''>(report.weight || '');
    const [editing, setEditing] = useState(report.weight === null);

    const [updateReportMutation, { isLoading: updateReportLoading }] = useMutation(
        (updatedReport: ApiReportPatch) => patchReport(updatedReport, keycloak.token),
        {
            onSuccess: () => {
                alert.show('Vekt ble registrert på uttaket.', { type: types.SUCCESS });
                queryCache.invalidateQueries(reportsDefaultQueryKey);
            },
            onError: () => {
                alert.show('Noe gikk kalt, uttaket ble ikke oppdatert.', { type: types.ERROR });
            },
        },
    );

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
        if (weight === report.weight) {
            setEditing(false);
            // If the weight isnt an empty string or the old weight then send an
            // api request as the weight has changed
        } else if (weight) {
            updateReportMutation({
                id: report.reportId,
                weight,
            });

            setEditing(false);
        }
    };

    // Button function to start edit mode
    const onEditButtonClick = () => {
        setEditing(true);
    };

    const startDateTime = new Date(report.startDateTime);
    const endDateTime = new Date(report.endDateTime);

    const reportStartTime = format(startDateTime, 'HH:mm');
    const reportEndTime = format(endDateTime, 'HH:mm');
    const reportDate = format(startDateTime, ' eee. d. MMMM yyyy', { locale: nb });

    const getMachineReadableDate = (date: Date) => format(date, 'yyyy-MM-dd');

    return (
        <Wrapper>
            <WithdrawalDate weight={report.weight}>
                <DateTime>
                    <b>Dato: </b>
                    <time dateTime={getMachineReadableDate(startDateTime)}>{reportDate}</time>
                </DateTime>
                <DateTime>
                    <b>Klokken: </b>
                    <time dateTime={formatISO(startDateTime)}>{reportStartTime}</time>&ndash;
                    <time dateTime={formatISO(endDateTime)}>{reportEndTime}</time>
                </DateTime>
            </WithdrawalDate>
            <WithdrawalLocation weight={report.weight}>{report.station.name}</WithdrawalLocation>
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
                    <BoxText>{report.weight} kg</BoxText>
                    <EditIcon onClick={onEditButtonClick} />
                </Box>
            )}
        </Wrapper>
    );
};
