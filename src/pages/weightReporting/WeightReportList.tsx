import * as React from 'react';
import styled from 'styled-components';
import { ApiReport } from '../../api/ReportService';
import { format, formatISO } from 'date-fns';
import { nb } from 'date-fns/locale';
import { WeightReportingForm } from './WeightReportingForm';
import VisuallyHidden from '@reach/visually-hidden';

const Wrapper = styled.ul`
    display: flex;
    flex-flow: column;
    padding: 0;
    list-style: none;
    width: 100%;
    overflow-x: auto;
    min-width: 45rem;
`;

const ReportListItem = styled.li`
    display: flex;
    border-bottom: 2px solid ${(props) => props.theme.colors.White};
`;

const ReportDescription = styled.dl<{ reported?: boolean }>`
    background-color: ${(props) => (props.reported ? props.theme.colors.LightGreen : props.theme.colors.Red)};
    display: flex;
    width: 100%;
    min-height: 3rem;
    padding: 0;
    margin: 0;

    dt,
    dd {
        display: inline;
        margin: 0;
    }

    dt {
        font-weight: bold;
    }

    dt::after {
        content: ': ';
    }

    dd {
        white-space: nowrap;
    }

    dd:not(:last-child) {
        padding-right: 1rem;
    }
`;

const ReportDescriptionGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-right: 2px solid ${(props) => props.theme.colors.White};
    flex-wrap: wrap;

    &:first-child {
        flex: 1 2 55%;
        min-width: 18rem;
    }

    &:nth-child(2) {
        flex: 1 0 15%;
        justify-content: center;
        font-weight: bold;
    }

    &:last-child {
        padding: 0;
        flex: 1 1 35%;
        border-right: none;
        background-color: ${(props) => props.theme.colors.White};
    }
`;

interface Props {
    reports: Array<ApiReport>;
}

export const WeightReportList: React.FC<Props> = ({ reports }) => (
    <Wrapper>
        {reports.map((report) => {
            const startDateTime = new Date(report.startDateTime);
            const endDateTime = new Date(report.endDateTime);

            const reportStartTime = format(startDateTime, 'HH:mm');
            const reportEndTime = format(endDateTime, 'HH:mm');
            const reportDate = format(startDateTime, ' eee. d. MMMM yyyy', { locale: nb });

            const getMachineReadableDate = (date: Date) => format(date, 'yyyy-MM-dd');

            return (
                <ReportListItem key={report.reportId}>
                    <ReportDescription reported={report.weight != null}>
                        <ReportDescriptionGroup>
                            <div>
                                <dt>Dato</dt>
                                <dd>
                                    <time dateTime={getMachineReadableDate(startDateTime)}>{reportDate}</time>
                                </dd>
                            </div>
                            <div>
                                <dt>Klokken</dt>
                                <dd>
                                    <time dateTime={formatISO(startDateTime)}>{reportStartTime}</time> til{' '}
                                    <time dateTime={formatISO(endDateTime)}>{reportEndTime}</time>
                                </dd>
                            </div>
                        </ReportDescriptionGroup>
                        <ReportDescriptionGroup>
                            <VisuallyHidden>
                                <dt>Stasjon</dt>
                            </VisuallyHidden>
                            <dd>{report.station.name}</dd>
                        </ReportDescriptionGroup>
                        <ReportDescriptionGroup>
                            <WeightReportingForm report={report} />
                        </ReportDescriptionGroup>
                    </ReportDescription>
                </ReportListItem>
            );
        })}
    </Wrapper>
);
