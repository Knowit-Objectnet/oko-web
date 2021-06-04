import * as React from 'react';
import { useState } from 'react';
import {
    ApiReport,
    ApiReportPatch,
    patchReport,
    reportsDefaultQueryKey,
} from '../../services/deprecated/ReportService';
import { types, useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { VisuallyHidden } from '@chakra-ui/react';
import { NegativeButton } from '../../components/buttons/NegativeButton';

const StyledForm = styled.form`
    display: flex;
`;

const StyledInput = styled.input`
    border: solid 2px ${(props) => props.theme.colors.Red};
    font-size: 1rem; // Important for the input to automatically flex/resize correctly
    flex: 1 1 auto;
`;

const SubmitButton = styled(NegativeButton)`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
`;

interface Props {
    report: ApiReport;
    onSubmit: () => void;
}

export const WeightReportForm: React.FC<Props> = ({ report, onSubmit }) => {
    const [weight, setWeight] = useState<number | null>(report.weight);

    const alert = useAlert();

    const queryClient = useQueryClient();
    const updateReportMutation = useMutation((updatedReport: ApiReportPatch) => patchReport(updatedReport), {
        onSuccess: () => {
            alert.show('Vekt ble registrert på uttaket.', { type: types.SUCCESS });
        },
        onError: () => {
            alert.show('Noe gikk kalt, uttaket ble ikke oppdatert.', { type: types.ERROR });
        },
        onSettled: () => {
            return queryClient.invalidateQueries(reportsDefaultQueryKey);
        },
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const userInput = event.currentTarget.value;
        setWeight(userInput === '' ? null : parseInt(event.currentTarget.value));
    };

    // Prevent user from using negative numbers, punctuation, and other special characters
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.persist();
        const pressedKeyCode = event.charCode;
        if ((pressedKeyCode < 48 || pressedKeyCode > 57) && pressedKeyCode !== 44) {
            event.preventDefault();
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (weight !== report.weight && typeof weight === 'number') {
            await updateReportMutation.mutateAsync({
                id: report.reportId,
                weight,
            });
        }
        onSubmit();
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <VisuallyHidden>
                <label htmlFor={`weight-${report.reportId}`}>Skriv inn vekt</label>
            </VisuallyHidden>
            <StyledInput
                type="number"
                id={`weight-${report.reportId}`}
                value={weight ?? ''}
                name={`weight-${report.reportId}`}
                placeholder="Skriv inn vekt i kg"
                min={0}
                onChange={onChange}
                onKeyPress={onKeyDown}
            />
            <SubmitButton disabled={weight === null} aria-label="Lagre vekt" isLoading={updateReportMutation.isLoading}>
                OK
            </SubmitButton>
        </StyledForm>
    );
};
