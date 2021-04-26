import * as React from 'react';
import FullCalendar, { EventInput, EventSourceFunc } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listViewPlugin from '@fullcalendar/list';
import resourceGridPlugin from '@fullcalendar/resource-timegrid';
import { Box } from '@chakra-ui/layout';
import { getEvents } from '../../services/EventService';
import { Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useStations } from '../../services/hooks/useStations';

export const Kalender: React.FC = () => {
    const fetchEvents: EventSourceFunc = async (fetchInfo, successCallback, failureCallback) => {
        let transformedResult: EventInput[] = [];
        try {
            const apiResult = await getEvents({
                fromDate: fetchInfo.startStr,
                toDate: fetchInfo.endStr,
            });
            transformedResult = apiResult.map((event) => ({
                start: event.startDateTime,
                end: event.endDateTime,
                title: `${event.partner.name} - ${event.station.name}`,
                resourceId: `${event.station.id}`,
            }));
        } catch (error) {
            failureCallback(error);
        }
        return transformedResult;
    };

    const { data: stations } = useStations();

    return (
        <Box padding={5} height="100%">
            <FullCalendar
                schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                resources={(stations ?? []).map((station) => {
                    return {
                        id: `${station.id}`,
                        title: station.name,
                    };
                })}
                plugins={[timeGridPlugin, dayGridPlugin, listViewPlugin, resourceGridPlugin]}
                height="100%"
                headerToolbar={{
                    start: 'prev,today,next',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,listWeek,resourceTimeGridDay',
                }}
                titleFormat={{
                    week: 'narrow',
                }}
                initialView="timeGridWeek"
                locale="nb-no"
                expandRows={true}
                allDaySlot={false}
                nowIndicator={true}
                businessHours={{
                    daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday
                    startTime: '07:00',
                    endTime: '17:00',
                }}
                dayHeaderContent={(args) => {
                    return (
                        <Text color={args.isToday ? 'red.500' : 'primary.default'}>
                            {format(args.date, 'EEEE dd. MMM', { locale: nb })}
                        </Text>
                    );
                }}
                slotMinTime="06:00"
                slotMaxTime="22:00"
                weekends={false}
                weekText="Uke "
                windowResizeDelay={0}
                events={{
                    events: fetchEvents,
                }}
                slotLabelFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                }}
            />
        </Box>
    );
};
