import * as React from 'react';
import { ApiReport, ApiReportPatch, patchReport, reportsDefaultQueryKey } from '../../api/ReportService';
import { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { types, useAlert } from 'react-alert';
import { queryCache, useMutation } from 'react-query';
import styled from 'styled-components';
import Pencil from '../../assets/Pencil.svg';
import { NegativeButton } from '../../sharedComponents/buttons/NegativeButton';
import VisuallyHidden from '@reach/visually-hidden';

const StyledForm = styled.form`
    display: flex;
    width: 100%;
`;

const Input = styled.input`
    border: solid 2px ${(props) => props.theme.colors.Red};
    font-size: 1.25rem;
    flex-grow: 1;
`;

const SubmitButton = styled(NegativeButton)`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
`;

const Box = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.LightBeige};
    font-weight: bold;
    font-size: 1.25rem;
`;

const BoxText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

const EditIcon = styled(Pencil)`
    height: 1rem;
    fill: ${(props) => props.theme.colors.Black};
    margin-right: 20px;
`;

interface Props {
    report: ApiReport;
}

export const WeightReportingForm: React.FC<Props> = ({ report }) => {
    const [weight, setWeight] = useState<number | ''>(report.weight || '');
    const [isEditing, setEditing] = useState(report.weight === null);

    const { keycloak } = useKeycloak();
    const alert = useAlert();

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

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const val = event.currentTarget.value;
        setWeight(val === '' ? val : parseInt(event.currentTarget.value));
    };

    // Prevent user from using negative numbers, punctuation, and other special characters
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.persist();
        const val = event.charCode;
        if ((val < 48 || val > 57) && val !== 44) event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (weight !== report.weight && typeof weight === 'number') {
            updateReportMutation({
                id: report.reportId,
                weight,
            });
        }
        setEditing(false);
    };

    const handleEditButtonClick = () => {
        setEditing(true);
    };

    return isEditing ? (
        <StyledForm onSubmit={handleSubmit}>
            <VisuallyHidden>
                <label htmlFor={`weight-${report.reportId}`}>Vekt</label>
            </VisuallyHidden>
            <Input
                id={`weight-${report.reportId}`}
                type="number"
                name={`weight-${report.reportId}`}
                placeholder="Skriv inn vektuttak (kg)"
                value={weight}
                min={0}
                onChange={onChange}
                onKeyPress={onKeyDown}
            />
            <SubmitButton disabled={weight === ''} isLoading={updateReportLoading}>
                OK
            </SubmitButton>
        </StyledForm>
    ) : (
        <Box>
            <BoxText>{report.weight} kg</BoxText>
            <EditIcon onClick={handleEditButtonClick} />
        </Box>
    );
};
