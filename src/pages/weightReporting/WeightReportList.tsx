import * as React from 'react';
import { ApiReport } from '../../api/ReportService';
import { WeightReportListItem } from './WeightReportListItem';
import VisuallyHidden from '@reach/visually-hidden';
import styled from 'styled-components';

const ReportTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1.5rem;
`;

const ReportTableHeader = styled.caption`
    text-align: left;
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
    padding: 0 0 1rem;
`;

interface Props {
    reports: Array<ApiReport>;
    header: string;
}

export const WeightReportList: React.FC<Props> = ({ reports, header }) => {
    return reports.length > 0 ? (
        <ReportTable>
            <ReportTableHeader>{header}</ReportTableHeader>
            <VisuallyHidden as="thead">
                <tr>
                    <th>Dato</th>
                    <th>Klokkeslett</th>
                    <th>Stasjon</th>
                    <th>Vekt</th>
                </tr>
            </VisuallyHidden>
            <tbody>
                {reports.map((report) => (
                    <WeightReportListItem key={report.reportId} report={report} />
                ))}
            </tbody>
        </ReportTable>
    ) : null;
};
