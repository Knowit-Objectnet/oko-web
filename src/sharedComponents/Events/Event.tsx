import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { EventMessageBox } from './EventMessageBox';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventSubmission } from './EventSubmission';
import { EventInfo, Roles } from '../../types';
import { EventStationInfo } from './EventStationInfo';
import { EventTemplateHorizontal } from './EventTemplateHorizontal';
import { useKeycloak } from '@react-keycloak/web';
import { types, useAlert } from 'react-alert';
import { DeleteEvent } from './DeleteEvent';
import { Button } from '../Button';
import { queryCache, useMutation } from 'react-query';
import { ApiEventParams, ApiEventPatch, deleteEvents, patchEvent, eventsDefaultQueryKey } from '../../api/EventService';

const Body = styled.div`
    display: flex;

    & > *:not(:last-child) {
        margin-right: 0.75rem;
    }
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    & > *:not(:first-child) {
        margin-top: 0.75rem;
    }
`;

interface Props {
    event: EventInfo;
    hideTitleBar?: boolean;
    afterDeleteSingleEvent?: (successful: boolean) => void;
    afterDeleteRangeEvent?: (successful: boolean) => void;
}

/**
 * Component shown when event in calendar is clicked.
 * Will be rendered differently depending on user's role.
 */
export const Event: React.FC<Props> = (props) => {
    const alert = useAlert();

    const { keycloak } = useKeycloak();
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);
    const userIsStation = keycloak.hasRealmRole(Roles.Ambassador);
    const stationOwnsEvent = keycloak.tokenParsed?.GroupID === props.event.resource.station.id;
    const userIsPartner = keycloak.hasRealmRole(Roles.Partner);
    const partnerOwnsEvent = keycloak.tokenParsed?.GroupID === props.event.resource.partner.id;

    const [deleteSingleEventMutation, { isLoading: deleteSingleEventLoading }] = useMutation(
        (event: EventInfo) => deleteEvents({ eventId: event.resource.eventId }, keycloak.token),
        {
            onSuccess: () => {
                alert.show('Avtalen ble slettet suksessfullt.', { type: types.SUCCESS });
                props.afterDeleteSingleEvent?.(true);
            },
            onError: () => {
                alert.show('Noe gikk kalt, avtalen ble ikke slettet.', { type: types.ERROR });
                props.afterDeleteSingleEvent?.(false);
            },
            onSettled: () => {
                queryCache.invalidateQueries(eventsDefaultQueryKey);
            },
        },
    );

    const [deleteRangeEventsMutation, { isLoading: deleteRangeEventLoading }] = useMutation(
        ({ event, fromDate, toDate }: { event: EventInfo; fromDate: Date; toDate: Date }) => {
            const apiParams: ApiEventParams = {
                recurrenceRuleId: event.resource.recurrenceRule?.id,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString(),
            };
            return deleteEvents(apiParams, keycloak.token);
        },
        {
            onSuccess: () => {
                alert.show('Avtalen(e) ble slettet suksessfullt.', { type: types.SUCCESS });
                props.afterDeleteRangeEvent?.(true);
            },
            onError: () => {
                alert.show('Noe gikk galt, avtalen(e) ble ikke slettet.', { type: types.ERROR });
                props.afterDeleteRangeEvent?.(false);
            },
            onSettled: () => {
                queryCache.invalidateQueries(eventsDefaultQueryKey);
            },
        },
    );

    const [updateEventMutation, { isLoading: updateEventLoading }] = useMutation(
        (updatedEvent: ApiEventPatch) => patchEvent(updatedEvent, keycloak.token),
        {
            onSuccess: () => {
                alert.show('Avtalen ble oppdatert suksessfullt.', { type: types.SUCCESS });
                setIsEditing(false);
            },
            onError: () => {
                alert.show('Noe gikk kalt, avtalen ble ikke oppdatert.', { type: types.ERROR });
            },
            onSettled: () => {
                queryCache.invalidateQueries(eventsDefaultQueryKey);
            },
        },
    );

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(props.event.start), new Date(props.event.end)]);
    const [timeRange, setTimeRange] = useState<[Date, Date]>([new Date(props.event.start), new Date(props.event.end)]);
    const [recurring, setReccuring] = useState<'None' | 'Daily' | 'Weekly'>('None');
    const [selectedDays, setSelectedDays] = useState<Array<number>>([1]);
    const [isDeletionConfirmationVisible, setIsDeletionConfirmationVisible] = useState(false);

    const handleDateRangeChange = (range: [Date, Date]) => {
        setDateRange(range);
    };

    const handleTimeRangeChange = (range: [Date, Date]) => {
        setTimeRange(range);
    };

    const handleRecurringChange = (value: 'None' | 'Daily' | 'Weekly') => {
        setReccuring(value);
    };

    const handleSelectedDaysChange = (num: Array<number>) => {
        setSelectedDays(num);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDeleteConfirmationClick = () => {
        setIsDeletionConfirmationVisible(!isDeletionConfirmationVisible);
    };

    const handleDeleteEvent = (isSingleDeletion: boolean, fromDate: Date, toDate: Date) => {
        const eventIsNotRecurring = !props.event.resource.recurrenceRule;
        if (isSingleDeletion || eventIsNotRecurring) {
            deleteSingleEventMutation(props.event);
        } else {
            deleteRangeEventsMutation({ event: props.event, fromDate, toDate });
        }
    };

    const handleEditCancelled = () => {
        setIsEditing(false);
        setDateRange([props.event.start, props.event.end]);
        setTimeRange([props.event.start, props.event.end]);
    };

    const handleEditSubmission = () => {
        const start = new Date(dateRange[0]);
        const end = new Date(dateRange[1]);
        start.setHours(
            timeRange[0].getHours(),
            timeRange[0].getMinutes(),
            timeRange[0].getSeconds(),
            timeRange[0].getMilliseconds(),
        );
        end.setHours(
            timeRange[1].getHours(),
            timeRange[1].getMinutes(),
            timeRange[1].getSeconds(),
            timeRange[1].getMilliseconds(),
        );

        // TODO: these values should not be hardcoded, but use station opening hours
        const min = new Date(start);
        min.setHours(8, 0, 0, 0);
        const max = new Date(end);
        max.setHours(20, 0, 0, 0);

        if (start > end) {
            alert.show('Start tiden kan ikke være etter slutt tiden.', { type: types.ERROR });
            return;
        }

        if (start < min) {
            alert.show('Starttiden kan ikke være før 08:00', { type: types.ERROR });
            return;
        }

        if (end > max) {
            alert.show('Sluttiden kan ikke være etter 20:00', { type: types.ERROR });
            return;
        }

        const updatedEvent: ApiEventPatch = {
            id: props.event.resource.eventId,
            startDateTime: start.toISOString(),
            endDateTime: end.toISOString(),
        };

        updateEventMutation(updatedEvent);
    };

    return (
        <EventTemplateHorizontal
            title={props.event.title}
            hideTitleBar={props.hideTitleBar}
            showEditSymbol={userIsAdmin || (userIsStation && stationOwnsEvent)}
            isEditing={isEditing}
            onEditClick={handleEditClick}
        >
            <Body>
                <Section>
                    <EventOptionDateRange
                        dateRange={dateRange}
                        timeRange={timeRange}
                        recurring={recurring}
                        selectedDays={selectedDays}
                        isEditing={isEditing}
                        onDateRangeChange={handleDateRangeChange}
                        onTimeRangeChange={handleTimeRangeChange}
                        onRecurringChange={handleRecurringChange}
                        onSelectedDaysChange={handleSelectedDaysChange}
                        recurrenceEnabled={false}
                    />
                    <EventStationInfo station={props.event.resource.station} />
                </Section>
                {!isEditing && (
                    <Section>
                        <EventMessageBox {...props.event.resource.message} />
                        {(userIsAdmin ||
                            (userIsPartner && partnerOwnsEvent) ||
                            (userIsStation && stationOwnsEvent)) && (
                            <Button text="Avlys uttak" variant="negative" onClick={handleDeleteConfirmationClick} />
                        )}
                    </Section>
                )}
            </Body>
            {isDeletionConfirmationVisible && !isEditing && (
                <DeleteEvent
                    allowRangeDeletion={userIsAdmin || (userIsStation && stationOwnsEvent)}
                    onSubmit={handleDeleteEvent}
                    loading={deleteSingleEventLoading || deleteRangeEventLoading}
                />
            )}
            {isEditing && (
                <EventSubmission
                    onSubmit={handleEditSubmission}
                    onCancel={handleEditCancelled}
                    loading={updateEventLoading}
                />
            )}
        </EventTemplateHorizontal>
    );
};
