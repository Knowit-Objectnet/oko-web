import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { EventInfo } from '../../../types';
import add from 'date-fns/add';
import { ExpandableAgenda } from '../AmbassadorCalendar/ExpandableAgenda';

const Wrapper = styled.div``;

interface AmbassadorCalendarProps {
    date: Date;
    isToggled: boolean;
    onSelectEvent: (start: Date, end: Date, title: string) => void;
    onWeekChange: (delta: -1 | 1) => void;
}

export const AmbassadorCalendar: React.FC<AmbassadorCalendarProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    // Function that handles an event click in the calendar. It displays the Event in a modal
    const onSelectEvent = (event: EventInfo) => {
        props.onSelectEvent(event.start, event.end, event.title);
    };

    const date = new Date();
    date.setHours(16, 0, 0, 0);
    const eventEnd = add(date, { minutes: 120 });
    const eventEnd2 = add(date, { minutes: 30 });
    const eventstart3 = add(date, { minutes: 31 });
    const eventEnd3 = add(date, { minutes: 200 });
    const eventStart4 = add(date, { minutes: 70 });
    const eventEnd4 = add(date, { minutes: 120 });

    const events: Array<EventInfo> = [
        {
            title: 'Frigo',
            start: date,
            end: eventEnd,
            resource: {
                location: {
                    id: 1,
                    name: 'test1',
                },
                message: {
                    start: date,
                    end: date,
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
                    start: date,
                    end: date,
                    text: 'test',
                },
            },
        },
        {
            title: 'Fretex',
            start: date,
            end: eventEnd2,
            resource: {
                location: {
                    id: 1,
                    name: 'test1',
                },
                message: {
                    start: date,
                    end: date,
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
                    start: date,
                    end: date,
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
                    start: date,
                    end: date,
                    text: 'test',
                },
            },
        },
    ];

    return (
        <Wrapper>
            <ExpandableAgenda
                date={props.date}
                isToggled={props.isToggled}
                onSelectEvent={onSelectEvent}
                events={events}
                onWeekChange={props.onWeekChange}
            />
        </Wrapper>
    );
};
