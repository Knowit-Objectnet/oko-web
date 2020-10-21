import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { default as DateCalendar } from 'react-calendar';
import { RegCalendar } from './RegCalendar/RegCalendar';
import { Event } from '../../sharedComponents/Events/Event';
import { ExtraEvent } from '../../sharedComponents/Events/ExtraEvent';
import { NewEvent } from '../../sharedComponents/Events/NewEvent';
import { SideMenu } from './SideMenu';
import { ApiEvent, EventInfo, Roles } from '../../types';
import { PartnerCalendar } from './PartnerCalendar/PartnerCalendar';
import { AmbassadorCalendar } from './AmbassadorCalendar/AmbassadorCalendar';
import add from 'date-fns/add';
import { Loading } from '../../sharedComponents/Loading';
import { useKeycloak } from '@react-keycloak/web';
import { types, useAlert } from 'react-alert';
import { LocationSelector } from './LocationSelector';
import useModal from '../../sharedComponents/Modal/useModal';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { ApiEventParams, getEvents } from '../../httpclient/eventClients';

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
export const CalendarPage: React.FC = () => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Alert dispatcher
    const alert = useAlert();
    // Modal dispatcher
    const modal = useModal();
    // State for day handling
    const [selectedDate, setSelectedDate] = useState(new Date());
    // State for side menu
    const [isToggled, setIsToggled] = useState(false);
    // State for location filtering
    const [selectedLocation, setSelectedLocation] = useState(-1);

    // from and to date for event fetching
    // The from date is the last monday from props.date and the to date is 1 week into the future
    // This is such that the week-calendar always has it's 5 days of events
    const fromDate = add(selectedDate, { days: selectedDate.getDay() === 0 ? -6 : -selectedDate.getDay() + 1 });
    fromDate.setHours(0, 0, 0, 0);
    const toDate = add(selectedDate, { weeks: 1 });
    toDate.setHours(24, 0, 0, 0);

    const eventsParams: ApiEventParams = {
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
    };

    if (keycloak.hasRealmRole(Roles.Ambassador)) {
        eventsParams.stationId = keycloak.tokenParsed.GroupID;
    } else if (keycloak.hasRealmRole(Roles.Partner)) {
        eventsParams.partnerId = keycloak.tokenParsed.GroupID;
        if (isToggled && selectedLocation !== -1) {
            eventsParams.stationId = selectedLocation;
        }
    } else {
        if (selectedLocation !== -1) {
            eventsParams.stationId = selectedLocation;
        }
    }

    const { data: apiEvents, isLoading } = useQuery<Array<ApiEvent>>({
        queryKey: ['getEvents', eventsParams, keycloak.token],
        queryFn: getEvents,
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
                          location: event.station,
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

    // New event display function
    const newEvent = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<NewEvent start={start} end={end} afterSubmit={closeModalOnSuccess} />);
    };

    // Extra event display function
    const extraEvent = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<ExtraEvent start={start} end={end} afterSubmit={afterExtraEventSubmission} />);
    };

    // On event selection function to display an event
    const onSelectEvent = (event: EventInfo) => {
        modal.show(
            <Event
                event={event}
                afterDeleteSingleEvent={closeModalOnSuccess}
                afterDeleteRangeEvent={closeModalOnSuccess}
                afterUpdateEvent={closeModalOnSuccess}
            />,
        );
    };

    // On slot selection function to display new or extra event
    const onSelectSlot = (start: Date, end: Date, isOslo: boolean) => {
        if (isOslo) {
            modal.show(<NewEvent start={start} end={end} />);
        } else {
            modal.show(<ExtraEvent start={start} end={end} afterSubmit={afterExtraEventSubmission} />);
        }
    };

    // Click function for agenda/calendar toggle button
    const toggleCalendarClick = () => {
        setIsToggled(!isToggled);
    };

    // On week change selector function
    const onWeekChange = (delta: -1 | 1) => {
        const dayOfDeltaWeek = add(selectedDate, { weeks: delta });
        setSelectedDate(dayOfDeltaWeek);
    };

    // On location change selector function
    const onSelectedLocationChange = (index: number) => {
        setSelectedLocation(index);
    };

    const afterExtraEventSubmission = (successful: boolean) => {
        if (successful) {
            // Give user feedback and close modal
            alert.show('Et nytt ekstrauttak ble lagt til suksessfullt.', { type: types.SUCCESS });
            modal.remove();
        } else {
            // Give user feedback
            alert.show('Noe gikk galt, ekstrauttaket ble ikke lagt til.', { type: types.ERROR });
        }
    };

    const closeModalOnSuccess = (successful: boolean) => {
        if (successful) {
            modal.remove();
        }
    };

    // Function to decide which calendar to render depending on role
    const getCalendar = () => {
        if (keycloak.hasRealmRole(Roles.Partner)) {
            return (
                <PartnerCalendar
                    onSelectEvent={onSelectEvent}
                    date={selectedDate}
                    isToggled={isToggled}
                    onWeekChange={onWeekChange}
                    events={events}
                />
            );
        } else if (keycloak.hasRealmRole(Roles.Ambassador)) {
            return (
                <AmbassadorCalendar
                    onSelectEvent={onSelectEvent}
                    date={selectedDate}
                    isToggled={isToggled}
                    onWeekChange={onWeekChange}
                    events={events}
                />
            );
        }
        return (
            <RegCalendar
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                newEvent={newEvent}
                date={selectedDate}
                isToggled={selectedLocation !== -1}
                onWeekChange={onWeekChange}
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
                    {((keycloak.hasRealmRole(Roles.Partner) && isToggled) || keycloak.hasRealmRole(Roles.Oslo)) && (
                        <LocationSelector
                            selectedLocation={selectedLocation}
                            onSelectedLocationChange={onSelectedLocationChange}
                        />
                    )}
                </ModuleDateCalendar>
                {!apiEvents && (!events || events.length <= 0) && isLoading ? (
                    <Loading text="Laster inn data..." />
                ) : (
                    <ModuleCalendar>{getCalendar()}</ModuleCalendar>
                )}
                <Sidebar>
                    <SideMenu
                        onCalendarToggleClick={toggleCalendarClick}
                        onNewEventClick={newEvent}
                        onExtraEventClick={extraEvent}
                    />
                </Sidebar>
            </Wrapper>
        </>
    );
};
