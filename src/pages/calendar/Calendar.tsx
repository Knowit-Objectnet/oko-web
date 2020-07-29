import * as React from 'react';
import styled from 'styled-components';
import { default as DateCalendar } from 'react-calendar';
import { RegCalendar } from './RegCalendar/RegCalendar';
import { useEffect, useState } from 'react';
import { Modal } from '../../sharedComponents/Modal';
import { Event } from './events/Event';
import { ExtraEvent } from './events/ExtraEvent';
import { NewEvent } from './events/NewEvent';
import { SideMenu } from './SideMenu';
import { ApiEvent, apiUrl, EventInfo, Roles } from '../../types';
import { PartnerCalendar } from './PartnerCalendar/PartnerCalendar';
import { AmbassadorCalendar } from './AmbassadorCalendar/AmbassadorCalendar';
import add from 'date-fns/add';
import differenceInDays from 'date-fns/differenceInDays';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Loading } from '../loading/Loading';
import { DeleteToAPI } from '../../utils/DeleteToAPI';
import { PostToAPI } from '../../utils/PostToAPI';
import { PatchToAPI } from '../../utils/PatchToAPI';
import { useKeycloak } from '@react-keycloak/web';
import { useAlert, types } from 'react-alert';

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
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
`;

const ModuleCalendar = styled(Module)`
    flex: 1;

    @media screen and (min-width: 900px) {
        overflow: auto;
    }
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
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
    // Alert dispatcher
    const alert = useAlert();
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // State for handling modal
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
    // State for day handling
    const [selectedDate, setSelectedDate] = useState(new Date());
    // State for side menu
    const [isToggled, setIsToggled] = useState(false);

    // from and to date for event fetching
    // The from date is the last monday from props.date and the to date is 1 week into the future
    // This is such that the week-calendar always has it's 5 days of events
    const fromDate = add(selectedDate, { days: selectedDate.getDay() === 0 ? -6 : -selectedDate.getDay() + 1 });
    fromDate.setHours(7, 0, 0, 0);
    const toDate = add(selectedDate, { weeks: 1 });
    toDate.setHours(20, 0, 0, 0);

    let url = '';
    if (keycloak.hasRealmRole(Roles.Ambassador)) {
        url = `${apiUrl}/calendar/events/?from-date=${fromDate.toISOString()}&to-date=${toDate.toISOString()}&station-id=${
            keycloak.tokenParsed.GroupID
        }`;
    } else if (keycloak.hasRealmRole(Roles.Partner)) {
        url = `${apiUrl}/calendar/events/?from-date=${fromDate.toISOString()}&to-date=${toDate.toISOString()}&partner-id=${
            keycloak.tokenParsed.GroupID
        }`;
    } else {
        url = `${apiUrl}/calendar/events/?from-date=${fromDate.toISOString()}&to-date=${toDate.toISOString()}`;
    }

    // Events fetched from the api
    // Contains parameters to only get events in date range specified above and only from the accounts
    // station location
    const { data: apiEvents, isValidating, mutate } = useSWR<ApiEvent[]>([url, keycloak.token], fetcher);
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

    // Function to get start and end times/dates for new events
    const getStartAndEnd = () => {
        // Date object for creating other date objects
        const date = new Date();
        // Date object for getting time and date now
        const now = new Date();

        // Max and min of opening time range
        const min = new Date(date.setHours(7, 0));
        const max = new Date(date.setHours(20, 0));

        // Round up to the closest quarter of an hour
        const startMinutes = (Math.ceil((now.getMinutes() + 1) / 15) * 15) % 60;
        // Round to the correct hour depending on the rounding of minutes
        const startHours = (((startMinutes / 105 + 0.5) | 0) + now.getHours()) % 24;
        // Set the start and date range for new event
        let start = new Date(date.setHours(startHours, startMinutes));
        let end = new Date(date.setHours(startHours + 1, startMinutes));

        // if the time now is less than the allowed minimum then set the start to minimum
        if (now < min) {
            start = min;
            // If the time now is less than one hour behind max then set end to max
        } else if (now.getHours() === max.getHours() - 1) {
            end = max;
            // If the time now is more than the allowed maximum then set the end to maximum
        } else if (now > max) {
            start = min;
            end = max;
        }

        return { start, end };
    };

    // New event display function
    const newEvent = () => {
        const { start, end } = getStartAndEnd();
        setModalContent(
            <NewEvent
                start={start}
                end={end}
                addEvent={addEvent}
                onFinished={() => {
                    setShowModal(false);
                }}
            />,
        );
        setShowModal(true);
    };

    // Extra event display function
    const extraEvent = () => {
        const { start, end } = getStartAndEnd();
        setModalContent(
            <ExtraEvent
                start={start}
                end={end}
                onFinished={() => {
                    setShowModal(false);
                }}
            />,
        );
        setShowModal(true);
    };

    // On event selection function to display an event
    const onSelectEvent = (event: EventInfo) => {
        setModalContent(
            <Event
                {...event}
                deleteSingleEvent={deleteSingleEvent}
                deleteRangeEvents={deleteRangeEvents}
                updateEvent={updateEvent}
            />,
        );
        setShowModal(true);
    };

    // On slot selection function to display new or extra event
    const onSelectSlot = (start: Date, end: Date, isOslo: boolean) => {
        if (isOslo) {
            setModalContent(
                <NewEvent
                    start={start}
                    end={end}
                    addEvent={addEvent}
                    onFinished={() => {
                        setShowModal(false);
                    }}
                />,
            );
        } else {
            setModalContent(
                <ExtraEvent
                    start={start}
                    end={end}
                    onFinished={() => {
                        setShowModal(false);
                    }}
                />,
            );
        }
        setShowModal(true);
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

    const addEvent = async (
        data: {
            startDateTime: string;
            endDateTime: string;
            station: { id: number };
            partner: { id: number };
            recurrenceRule?: {
                until: string;
                days?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'>;
                count?: number;
                interval?: number;
            };
        },
        stationName: string,
        partnerName: string,
    ) => {
        try {
            if (apiEvents) {
                // Mutate local data
                const newEvent: ApiEvent = {
                    startDateTime: data.startDateTime,
                    endDateTime: data.endDateTime,
                    id: -1,
                    partner: {
                        id: data.station.id,
                        name: partnerName,
                    },
                    station: {
                        id: data.partner.id,
                        name: stationName,
                    },
                    recurrenceRule: data.recurrenceRule
                        ? {
                              id: -1,
                              until: data.recurrenceRule.until,
                              days: data.recurrenceRule.days || [],
                              count: data.recurrenceRule.count || 0,
                              interval: data.recurrenceRule.interval || 0,
                          }
                        : null,
                };
                // Create the new event(s) locally for the local state
                const newEvents = [...apiEvents];
                if (data.recurrenceRule && data.recurrenceRule.days) {
                    const days: Array<number> = data.recurrenceRule.days.map((day) => {
                        switch (day) {
                            case 'MONDAY':
                                return 1;
                            case 'TUESDAY':
                                return 2;
                            case 'WEDNESDAY':
                                return 3;
                            case 'THURSDAY':
                                return 4;
                            case 'FRIDAY':
                                return 5;
                        }
                    });

                    // Make the minimum of 5 (the days we show in the calendar at once) and the dayes in the new event range
                    const min = Math.min(
                        5,
                        differenceInDays(new Date(data.recurrenceRule.until), new Date(data.startDateTime)) + 1,
                    );
                    for (let i = 0; i < min; i++) {
                        // create a copy of the start and end time
                        const newStart = new Date(data.startDateTime);
                        const newEnd = new Date(data.endDateTime);

                        // Copy the new event
                        const additionalEvent = { ...newEvent };
                        // Update the id to get an unique id
                        additionalEvent.id -= i + 1;

                        // Get the next day
                        const newDate = add(newStart, { days: i });

                        // Check if the next day is included in the days
                        const day = newDate.getDay();
                        if (!days.includes(day)) continue;

                        // Set the date to the weekday of this week
                        newStart.setDate(newDate.getDate());
                        newEnd.setDate(newDate.getDate());
                        // Update the event with the new dates
                        additionalEvent.startDateTime = newStart.toISOString();
                        additionalEvent.endDateTime = newEnd.toISOString();
                        newEvents.push(additionalEvent);
                    }
                } else {
                    newEvents.push(newEvent);
                }

                await mutate(newEvents, false);
                setShowModal(false);
            }

            // Post the event to the backend
            await PostToAPI(url, data, keycloak.token);

            // Give user feedback
            alert.show('Avtalen ble lagt til suksessfullt.', { type: types.SUCCESS });

            // trigger a revalidation (refetch) to make sure our local data is correct
            mutate();
        } catch (err) {
            alert.show('Noe gikk kalt, avtalen ble ikke lagt til.', { type: types.ERROR });
        }
    };

    const deleteSingleEvent = async (event: EventInfo) => {
        try {
            if (apiEvents) {
                // update the local data immediately, but disable the revalidation
                const newEvents = apiEvents.filter((apiEvent) => apiEvent.id !== event.resource.eventId);
                await mutate(newEvents, false);
                setShowModal(false);
            }

            // send a request to the API to update the source
            await DeleteToAPI(`${apiUrl}/calendar/events/?event-id=${event.resource.eventId}`, keycloak.token);

            // Give user feedback
            alert.show('Avtalen ble slettet suksessfullt.', { type: types.SUCCESS });

            // trigger a revalidation (refetch) to make sure our local data is correct
            mutate();
        } catch (err) {
            alert.show('Noe gikk kalt, avtalen ble ikke slettet.', { type: types.ERROR });
        }
    };

    const deleteRangeEvents = async (event: EventInfo, range: [Date, Date]) => {
        if (!event.resource.recurrenceRule) {
            await deleteSingleEvent(event);
            return;
        }

        try {
            if (apiEvents) {
                // Set range date times to low and high times to make sure all events in the range gets deleeted
                const start = range[0];
                const end = range[1];
                start.setHours(2, 0, 0, 0);
                end.setHours(22, 0, 0, 0);
                // update the local data immediately, but disable the revalidation
                const newEvents = apiEvents.filter(
                    (apiEvent) =>
                        !(
                            apiEvent.recurrenceRule &&
                            event.resource.recurrenceRule &&
                            apiEvent.recurrenceRule.id === event.resource.recurrenceRule.id &&
                            new Date(apiEvent.startDateTime) >= start &&
                            new Date(apiEvent.startDateTime) <= end
                        ),
                );
                await mutate(newEvents, false);
                setShowModal(false);

                // send a request to the API to update the source
                await DeleteToAPI(
                    `${apiUrl}/calendar/events/?recurrence-rule-id=${
                        event.resource.recurrenceRule?.id
                    }&from-date=${start.toISOString().slice(0, -2)}&to-date=${end.toISOString().slice(0, -2)}`,
                    keycloak.token,
                );

                // Give user feedback
                alert.show('Slettingen var vellykket.', { type: types.SUCCESS });

                // trigger a revalidation (refetch) to make sure our local data is correct
                mutate();
            }
        } catch (err) {
            alert.show('Noe gikk galt, avtalen(e) ble ikke slettet.', { type: types.ERROR });
        }
    };

    const updateEvent = async (eventId: number, start: string, end: string) => {
        try {
            // Update the local state if the apiEvents exist
            if (apiEvents) {
                // Find the event we want to update
                const newEvent = apiEvents.find((event) => event.id === eventId);

                // Tell the user that we were unable to update local data if we cant find the event
                // , and hope that it works to update the api
                if (!newEvent) {
                    alert.show('Klarte ikke å oppdatere lokal data, vennligst vent.', { type: types.INFO });
                } else {
                    // Update the event
                    newEvent.startDateTime = start;
                    newEvent.endDateTime = end;

                    // Create a new array of events to not directly mutate state
                    const newEvents = apiEvents.filter((event) => event.id !== eventId);

                    // Add the updated event to the new Events
                    newEvents.push(newEvent);

                    // update the local data immediately, but disable the revalidation
                    await mutate(newEvents, false);
                    setShowModal(false);
                }
            }

            // send a request to the API to update the source
            await PatchToAPI(
                `${apiUrl}/calendar/events/`,
                { id: eventId, startDateTime: start.slice(0, -2), endDateTime: end.slice(0, -2) },
                keycloak.token,
            );

            // Give user feedback
            alert.show('Avtalen ble oppdatert suksessfullt.', { type: types.SUCCESS });

            // trigger a revalidation (refetch) to make sure our local data is correct
            mutate();
        } catch (err) {
            alert.show('Noe gikk kalt, avtalen ble ikke oppdatert.', { type: types.ERROR });
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
                    deleteEvent={deleteSingleEvent}
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
                events={events}
            />
        );
    };

    return (
        <>
            {showModal ? (
                <Modal
                    exitModalCallback={() => {
                        setShowModal(false);
                    }}
                    content={modalContent}
                />
            ) : null}
            <Wrapper>
                <ModuleDateCalendar>
                    <DateCalendar locale="nb-NO" value={selectedDate} onChange={onDateChange} />
                </ModuleDateCalendar>
                {!apiEvents && (!events || events.length <= 0) && isValidating ? (
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
