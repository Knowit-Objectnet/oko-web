import * as React from 'react';
import { useState } from 'react';
import { ApiReport } from '../../../services/_deprecated/ReportService';
import { format, formatISO } from 'date-fns';
import { nb } from 'date-fns/locale';
import styled from 'styled-components';
import Pencil from '../../../assets/Pencil.svg';
import { WeightReportForm } from './WeightReportForm';

const ReportDataRow = styled.tr<{ weightReported: boolean }>`
    background-color: ${(props) => (props.weightReported ? props.theme.colors.LightGreen : props.theme.colors.Red)};
    border-bottom: 0.125rem solid ${(props) => props.theme.colors.White};
    height: 3rem;
`;

const ReportDataField = styled.td`
    padding: 0.5rem 1rem;
    border-right: 2px solid ${(props) => props.theme.colors.White};
    vertical-align: middle;
    white-space: nowrap;
`;

const ReportDateField = styled(ReportDataField)`
    border-right: none;
`;

const ReportTimeField = styled(ReportDataField)`
    padding-left: 0;
`;

const DateTimeLabel = styled.span`
    font-weight: bold;
`;

const ReportStationField = styled(ReportDataField)`
    font-weight: bold;
    text-align: center;
`;

const ReportWeightField = styled(ReportDataField)<{ isEditing: boolean }>`
    min-width: 18rem;
    padding: 0;
    background-color: ${(props) => (props.isEditing ? props.theme.colors.White : props.theme.colors.LightBeige)};
`;

const ReportWeightInfoField = styled.div`
    display: flex;
    width: 100%;
    white-space: nowrap;
`;

const ReportedWeight = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    font-weight: bold;
    font-size: 1.25rem;
    padding-left: 1rem;
`;

const EditButton = styled.button`
    appearance: none;
    border: none;
    background: transparent;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
`;

const EditIcon = styled(Pencil)`
    height: 100%;
    width: auto;
    fill: ${(props) => props.theme.colors.Black};
`;

interface Props {
    report: ApiReport;
}

export const WeightReportListItem: React.FC<Props> = ({ report }) => {
    const [isEditing, setIsEditing] = useState(report.weight === null);

    const startDateTime = new Date(report.startDateTime);
    const endDateTime = new Date(report.endDateTime);

    const reportStartTime = format(startDateTime, 'HH:mm');
    const reportEndTime = format(endDateTime, 'HH:mm');
    const reportDate = format(startDateTime, 'eee. d. MMMM yyyy', { locale: nb });

    const getMachineReadableDate = (date: Date) => format(date, 'yyyy-MM-dd');

    return (
        <ReportDataRow weightReported={report.weight !== null}>
            <ReportDateField>
                <DateTimeLabel aria-hidden="true">Dato:</DateTimeLabel>{' '}
                <time dateTime={getMachineReadableDate(startDateTime)}>{reportDate}</time>
            </ReportDateField>
            <ReportTimeField>
                <DateTimeLabel aria-hidden="true">Klokken:</DateTimeLabel>{' '}
                <time dateTime={formatISO(startDateTime)}>{reportStartTime}</time>
                {` til `}
                <time dateTime={formatISO(endDateTime)}>{reportEndTime}</time>
            </ReportTimeField>
            <ReportStationField>{report.station.name}</ReportStationField>
            <ReportWeightField isEditing={isEditing}>
                {isEditing ? (
                    <WeightReportForm report={report} onSubmit={() => setIsEditing(false)} />
                ) : (
                    <ReportWeightInfoField>
                        <ReportedWeight>{report.weight} kg</ReportedWeight>
                        <EditButton aria-label="Rediger rapportert vekt" onClick={() => setIsEditing(true)}>
                            <EditIcon />
                        </EditButton>
                    </ReportWeightInfoField>
                )}
            </ReportWeightField>
        </ReportDataRow>
    );
};
