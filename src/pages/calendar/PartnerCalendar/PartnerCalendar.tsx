import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { ExpandableAgenda } from './ExpandableAgenda';
import { EventInfo } from '../../../types';
import add from 'date-fns/add';

const Wrapper = styled.div``;

interface PartnerCalendarProps {
    date: Date;
    isToggled: boolean;
}

export const PartnerCalendar: React.FC<PartnerCalendarProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    props.date.setHours(16, 0, 0, 0);
    const eventEnd = add(props.date, { minutes: 120 });
    const eventEnd2 = add(props.date, { minutes: 30 });
    const eventstart3 = add(props.date, { minutes: 31 });
    const eventEnd3 = add(props.date, { minutes: 200 });
    const eventStart4 = add(props.date, { minutes: 70 });
    const eventEnd4 = add(props.date, { minutes: 120 });

    const events: Array<EventInfo> = [
        {
            title: 'Frigo',
            start: props.date,
            end: eventEnd,
            resource: {
                location: {
                    id: 1,
                    name: 'test1',
                },
                message: {
                    start: props.date,
                    end: props.date,
                    text: 'test',
                },
            },
        },
        {
            title: 'Test',
            start: eventEnd,
            end: eventEnd3,
            resource: {
                location: {
                    id: 2,
                    name: 'test2',
                },
                message: {
                    start: props.date,
                    end: props.date,
                    text: 'test',
                },
            },
        },
        {
            title: 'Fretex',
            start: props.date,
            end: eventEnd2,
            resource: {
                location: {
                    id: 1,
                    name: 'test1',
                },
                message: {
                    start: props.date,
                    end: props.date,
                    text: 'test',
                },
            },
        },
        {
            title: 'Jobben',
            start: eventstart3,
            end: eventEnd3,
            resource: {
                location: {
                    id: 2,
                    name: 'test2',
                },
                message: {
                    start: props.date,
                    end: props.date,
                    text: 'test',
                },
            },
        },
        {
            title: 'Test 2',
            start: eventStart4,
            end: eventEnd4,
            resource: {
                location: {
                    id: 3,
                    name: 'test3',
                },
                message: {
                    start: props.date,
                    end: props.date,
                    text: 'test',
                },
            },
        },
    ];

    return (
        <Wrapper>
            <ExpandableAgenda date={props.date} isToggled={props.isToggled} events={events} />
        </Wrapper>
    );
};
