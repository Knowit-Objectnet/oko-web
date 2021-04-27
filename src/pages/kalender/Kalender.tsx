import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listViewPlugin from '@fullcalendar/list';
import resourceGridPlugin from '@fullcalendar/resource-timegrid';
import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { useStations } from '../../services/hooks/useStations';
import { usePersistedState } from '../../utils/usePersistedState';
import { useEvents } from '../../services/hooks/useEvents';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../auth/useAuth';

type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'listWeek' | 'resourceTimeGridDay';

export const Kalender: React.FC = () => {
    const { user } = useAuth();

    const fullCalendarRef = useRef<FullCalendar>(null);
    const fullCalendarApi = fullCalendarRef.current?.getApi();

    const [selectedDateRange, setSelectedDateRange] = useState<
        { fromDate: Date; toDate: Date; currentDate: Date } | undefined
    >();
    const [persistedViewMode, setPersistedViewMode] = usePersistedState<CalendarView>('viewMode', 'timeGridWeek');

    const { data: stations } = useStations();
    const { data: events } = useEvents(
        {
            // TODO: find a way to (pre)fetch events before/after what is displayed in the current view
            fromDate: selectedDateRange?.fromDate.toISOString(),
            toDate: selectedDateRange?.toDate.toISOString(),
            stationId: user.isStasjon ? user.aktorId : undefined,
        },
        {
            onSuccess: () => {
                // Force FullCalendar to update
                fullCalendarApi?.refetchEvents();
            },
            // Wait to fetch data until FullCalendar is ready
            enabled: selectedDateRange !== undefined,
        },
    );

    // Loads events on first render
    useEffect(() => {
        if (fullCalendarApi) {
            setSelectedDateRange({
                fromDate: fullCalendarApi.view.activeStart,
                toDate: fullCalendarApi.view.activeEnd,
                currentDate: fullCalendarApi.getDate(),
            });
        }
    }, [fullCalendarApi]);

    // Reloads events on view change
    fullCalendarApi?.on('datesSet', (dateRange) => {
        setSelectedDateRange({
            fromDate: dateRange.start,
            toDate: dateRange.end,
            currentDate: fullCalendarApi.getDate(),
        });
    });

    const ViewToggleButton: React.FC<{ label: string; view: CalendarView }> = ({ label, view }) => (
        <Button
            fontWeight="normal"
            onClick={() => {
                setPersistedViewMode(view);
                fullCalendarApi?.changeView(view);
            }}
            isActive={persistedViewMode === view}
        >
            {label}
        </Button>
    );

    const goToToday = () => fullCalendarApi?.today();
    const goToPrev = () => fullCalendarApi?.prev();
    const goToNext = () => fullCalendarApi?.next();

    // const getCalendarHeading = () => {
    // switch (persistedViewMode) {
    //     case 'dayGridMonth':
    //         return selectedDateRange && `${format(selectedDateRange.currentDate, 'MMMM yyyy', { locale: nb })}`;
    //     case 'resourceTimeGridDay':
    //         return selectedDateRange && `${format(selectedDateRange.currentDate, 'dd. MMMM yyyy', { locale: nb })}`;
    //     default:
    //         return `Uke ${
    //             selectedDateRange &&
    //             `${getISOWeek(selectedDateRange?.fromDate)}, ${format(selectedDateRange.currentDate, 'yyyy')}`
    //         }`;
    // }
    // };

    return (
        <Stack direction="column" padding={5} height="100%">
            <Stack direction="row" justifyContent="space-between">
                <ButtonGroup isAttached size="sm">
                    <Button fontWeight="normal" onClick={goToPrev}>
                        {'< Forrige'}
                    </Button>
                    <Button fontWeight="normal" onClick={goToToday}>
                        I dag
                    </Button>
                    <Button fontWeight="normal" onClick={goToNext}>
                        {'Neste >'}
                    </Button>
                </ButtonGroup>
                <Heading as="h2" fontSize="1.75rem">
                    {fullCalendarApi?.getCurrentData().viewTitle}
                </Heading>
                <ButtonGroup isAttached size="sm">
                    <ViewToggleButton label="Måned" view="dayGridMonth" />
                    <ViewToggleButton label="Uke" view="timeGridWeek" />
                    <ViewToggleButton label="Liste" view="listWeek" />
                    <ViewToggleButton label="Stasjoner" view="resourceTimeGridDay" />
                </ButtonGroup>
            </Stack>
            <FullCalendar
                ref={fullCalendarRef}
                schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives" // TODO: replace with valid license
                headerToolbar={false}
                plugins={[timeGridPlugin, dayGridPlugin, listViewPlugin, resourceGridPlugin]}
                initialView={persistedViewMode}
                events={events?.map((event) => ({
                    start: event.startDateTime,
                    end: event.endDateTime,
                    title: `${event.partner.name} - ${event.station.name}`,
                    resourceId: `${event.station.id}`,
                }))}
                resources={stations?.map((station) => {
                    return {
                        id: `${station.id}`,
                        title: station.name,
                    };
                })}
                locale="nb-no"
                weekText="Uke "
                weekends={false}
                allDaySlot={false}
                slotMinTime="06:00"
                slotMaxTime="22:00"
                slotLabelFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                }}
                businessHours={{
                    daysOfWeek: [1, 2, 3, 4, 5],
                    startTime: '07:00',
                    endTime: '17:00',
                }}
                nowIndicator={true}
                expandRows={true}
                height="100%"
                // dayHeaderContent={(args) => {
                //     return (
                //         <Text color={args.isToday ? 'red.500' : 'primary.default'}>
                //             {format(args.date, 'EEEE dd. MMM', { locale: nb })}
                //         </Text>
                //     );
                // }}
            />
        </Stack>
    );
};
