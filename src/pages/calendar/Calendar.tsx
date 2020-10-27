import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { default as DateCalendar } from 'react-calendar';
import { RegCalendar } from './RegCalendar/RegCalendar';
import { Event } from '../../sharedComponents/Events/Event';
import { ExtraEvent } from '../../sharedComponents/Events/ExtraEvent';
import { NewEvent } from '../../sharedComponents/Events/NewEvent';
import { SideMenu } from './SideMenu';
import { EventInfo, Roles } from '../../types';
import { PartnerCalendar } from './PartnerCalendar/PartnerCalendar';
import { AmbassadorCalendar } from './AmbassadorCalendar/AmbassadorCalendar';
import add from 'date-fns/add';
import { Loading } from '../../sharedComponents/Loading';
import { useKeycloak } from '@react-keycloak/web';
import { types, useAlert } from 'react-alert';
import { StationSelector } from './StationSelector';
import useModal from '../../sharedComponents/Modal/useModal';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { ApiEvent, ApiEventParams, eventsDefaultQueryKey, getEvents } from '../../api/EventService';

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
    const alert = useAlert();
    const modal = useModal();

    const { keycloak } = useKeycloak();
    const userIsStation = keycloak.hasRealmRole(Roles.Ambassador);
    const userIsPartner = keycloak.hasRealmRole(Roles.Partner);
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);
    const userId = keycloak.tokenParsed?.GroupID;

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

    const eventsFilter: ApiEventParams = {
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        stationId: userIsStation ? userId : selectedStationId,
    };

    const { data: apiEvents, isLoading } = useQuery<Array<ApiEvent>>({
        queryKey: [eventsDefaultQueryKey, eventsFilter, keycloak.token],
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

    const showNewEventModal = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<NewEvent start={start} end={end} afterSubmit={closeModalOnSuccess} />);
    };

    const showNewExtraEventModal = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<ExtraEvent start={start} end={end} afterSubmit={afterExtraEventSubmission} />);
    };

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
    const onSelectSlot = (start: Date, end: Date, isOslo: boolean) => {
        if (isOslo) {
            modal.show(<NewEvent start={start} end={end} />);
        } else {
            modal.show(<ExtraEvent start={start} end={end} afterSubmit={afterExtraEventSubmission} />);
        }
    };

    const toggleShowCalendar = () => {
        setShowingCalendar(!showingCalendar);
    };

    const handleWeekChange = (delta: -1 | 1) => {
        const dayOfDeltaWeek = add(selectedDate, { weeks: delta });
        setSelectedDate(dayOfDeltaWeek);
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

    // Function to decide which calendar to render depending on role
    const getCalendar = () => {
        if (userIsPartner) {
            return (
                <PartnerCalendar
                    onSelectEvent={showEventInfoModal}
                    date={selectedDate}
                    showCalendar={showingCalendar}
                    onWeekChange={handleWeekChange}
                    events={events}
                />
            );
        } else if (userIsStation) {
            return (
                <AmbassadorCalendar
                    onSelectEvent={showEventInfoModal}
                    date={selectedDate}
                    isToggled={showingCalendar}
                    onWeekChange={handleWeekChange}
                    events={events}
                />
            );
        }
        return (
            <RegCalendar
                onSelectEvent={showEventInfoModal}
                onSelectSlot={onSelectSlot}
                newEvent={showNewEventModal}
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
                    {(userIsAdmin || (userIsPartner && showingCalendar)) && (
                        <StationSelector
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
                    <SideMenu
                        onCalendarToggleClick={toggleShowCalendar}
                        onNewEventClick={showNewEventModal}
                        onExtraEventClick={showNewExtraEventModal}
                    />
                </Sidebar>
            </Wrapper>
        </>
    );
};
