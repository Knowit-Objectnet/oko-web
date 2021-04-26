import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { default as DateCalendar } from 'react-calendar';
import { AdminCalendar } from './AdminCalendar/AdminCalendar';
import { Event } from '../../components/events/Event';
import { NewPickUp } from '../../components/events/NewPickUp';
import { NewEvent } from '../../components/events/NewEvent';
import { CalendarSideMenu } from './CalendarSideMenu';
import { EventInfo } from '../../types';
import { PartnerCalendar } from './PartnerCalendar/PartnerCalendar';
import { StationCalendar } from './StationCalendar/StationCalendar';
import add from 'date-fns/add';
import { Loading } from '../../components/Loading';
import { StationFilter } from './StationFilter';
import useModal from '../../components/modal/useModal';
import { Helmet } from 'react-helmet';
import { ApiEvent } from '../../services/EventService';
import { useEvents } from '../../services/hooks/useEvents';
import { useAuth } from '../../auth/useAuth';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 40px;
    box-sizing: border-box;

    @media screen and (max-width: 900px) {
        flex-direction: column;
        overflow: auto;
    }
`;

const Module = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModuleDateCalendar = styled.div`
    margin-right: 20px;

    & > .react-calendar {
        border: none;
    }

    @media screen and (max-width: 900px) {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        margin-bottom: 20px;
    }
`;

const ModuleCalendar = styled(Module)`
    flex: 1;
    overflow: auto;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    justify-content: flex-start;
    align-items: flex-start;

    @media screen and (max-width: 900px) {
        position: absolute;
        top: 10px;
        left: 10px;
        margin-left: 0;
    }
`;

/**
 * The page component for the calendar view
 */
export const Calendar: React.FC = () => {
    const modal = useModal();

    const { user } = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStationId, setSelectedStationId] = useState<number | undefined>();
    const [showingCalendar, setShowingCalendar] = useState(false);

    // from and to date for event fetching
    // The from date is the last monday from props.date and the to date is 1 week into the future
    // This is such that the week-calendar always has it's 5 days of events
    const fromDate = add(selectedDate, { days: selectedDate.getDay() === 0 ? -6 : -selectedDate.getDay() + 1 });
    fromDate.setHours(0, 0, 0, 0);
    const toDate = add(selectedDate, { weeks: 1 });
    toDate.setHours(24, 0, 0, 0);

    const { data: apiEvents, isLoading } = useEvents({
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        stationId: user.isStasjon ? user.aktorId : selectedStationId,
    });

    const [events, setEvents] = useState<Array<EventInfo>>([]);

    useEffect(() => {
        const _events: EventInfo[] = apiEvents
            ? apiEvents.map((event: ApiEvent) => {
                  const newEvent: EventInfo = {
                      start: new Date(event.startDateTime),
                      end: new Date(event.endDateTime),
                      title: event.partner.name,
                      resource: {
                          eventId: event.id,
                          partner: event.partner,
                          station: event.station,
                          recurrenceRule: event.recurrenceRule,
                      },
                  };
                  return newEvent;
              })
            : [];
        setEvents(_events);
    }, [apiEvents]);

    // on date change function for the react date selector
    const onDateChange = (date: Date | Date[]) => {
        if (date instanceof Date) {
            setSelectedDate(date);
        }
    };

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const showEventInfoModal = (event: EventInfo) => {
        modal.show(
            <Event
                event={event}
                afterDeleteSingleEvent={closeModalOnSuccess}
                afterDeleteRangeEvent={closeModalOnSuccess}
            />,
        );
    };

    // On slot selection function to display new or extra event
    const onSelectSlot = (start: Date, end: Date) => {
        if (user.isAdmin) {
            modal.show(<NewEvent start={start} end={end} afterSubmit={closeModalOnSuccess} />);
        } else {
            modal.show(<NewPickUp start={start} end={end} afterSubmit={closeModalOnSuccess} />);
        }
    };

    const toggleShowCalendar = () => {
        setShowingCalendar(!showingCalendar);
    };

    const handleWeekChange = (delta: -1 | 1) => {
        const dayOfDeltaWeek = add(selectedDate, { weeks: delta });
        setSelectedDate(dayOfDeltaWeek);
    };

    // Function to decide which calendar to render depending on role
    const getCalendar = () => {
        if (user.isPartner) {
            return (
                <PartnerCalendar
                    onSelectEvent={showEventInfoModal}
                    date={selectedDate}
                    showCalendar={showingCalendar}
                    onWeekChange={handleWeekChange}
                    events={events}
                />
            );
        } else if (user.isStasjon) {
            return (
                <StationCalendar
                    onSelectEvent={showEventInfoModal}
                    date={selectedDate}
                    isToggled={showingCalendar}
                    onWeekChange={handleWeekChange}
                    events={events}
                />
            );
        }
        return (
            <AdminCalendar
                onSelectEvent={showEventInfoModal}
                onSelectSlot={onSelectSlot}
                date={selectedDate}
                isToggled={selectedStationId !== undefined}
                onWeekChange={handleWeekChange}
                events={events}
            />
        );
    };

    return (
        <>
            <Helmet>
                <title>Kalender</title>
            </Helmet>
            <Wrapper>
                <ModuleDateCalendar>
                    <DateCalendar locale="nb-NO" value={selectedDate} onChange={onDateChange} />
                    {(user.isAdmin || (user.isPartner && showingCalendar)) && (
                        <StationFilter
                            selectedStationId={selectedStationId}
                            onSelectedStationChange={setSelectedStationId}
                        />
                    )}
                </ModuleDateCalendar>
                {!apiEvents && (!events || events.length <= 0) && isLoading ? (
                    <Loading text="Laster inn data..." />
                ) : (
                    <ModuleCalendar>{getCalendar()}</ModuleCalendar>
                )}
                <Sidebar>
                    <CalendarSideMenu onCalendarToggleClick={toggleShowCalendar} />
                </Sidebar>
            </Wrapper>
        </>
    );
};
