import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { EventMessageBox } from './EventMessageBox';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventSubmission } from './EventSubmission';
import { EventInfo, Roles } from '../../types';
import { EventOptionLocation } from './EventOptionLocation';
import { EventTemplateHorizontal } from './EventTemplateHorizontal';
import { useKeycloak } from '@react-keycloak/web';
import { types, useAlert } from 'react-alert';
import { DeleteEvent } from './DeleteEvent';
import { Button } from '../Button';
import { queryCache, useMutation, useQueryCache } from 'react-query';
import { ApiEventParams, ApiEventPatch, deleteEvents, patchEvent, eventsDefaultQueryKey } from '../../api/EventService';

const Body = styled.div`
    display: flex;
    flex-direction: row;
`;

const Section = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;

    &:nth-child(2) {
        margin-left: 10px;
    }
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

interface EventProps {
    event: EventInfo;
    hideTitleBar?: boolean;
    afterDeleteSingleEvent?: (successful: boolean) => void;
    afterDeleteRangeEvent?: (successful: boolean) => void;
}

/**
 * Component shown when event in calendar is clicked.
 * Will be rendered differently depending on user's role.
 */
export const Event: React.FC<EventProps> = (props) => {
    const alert = useAlert();

    const { keycloak } = useKeycloak();
    const isAdmin = keycloak.hasRealmRole(Roles.Oslo);
    const isStation = keycloak.hasRealmRole(Roles.Ambassador);
    const stationOwnsEvent = keycloak.tokenParsed.GroupID === props.event.resource.location.id;
    const isPartner = keycloak.hasRealmRole(Roles.Partner);
    const partnerOwnsEvent = keycloak.tokenParsed.GroupID === props.event.resource.partner.id;

    const [deleteSingleEventMutation, { isLoading: deleteSingleEventLoading }] = useMutation(
        async (event: EventInfo) => {
            await deleteEvents({ eventId: event.resource.eventId }, keycloak.token);
        },
        {
            onSuccess: () => {
                alert.show('Avtalen ble slettet suksessfullt.', { type: types.SUCCESS });
                if (props.afterDeleteSingleEvent) {
                    props.afterDeleteSingleEvent(true);
                }
            },
            onError: () => {
                alert.show('Noe gikk kalt, avtalen ble ikke slettet.', { type: types.ERROR });
                if (props.afterDeleteSingleEvent) {
                    props.afterDeleteSingleEvent(false);
                }
            },
            onSettled: () => {
                queryCache.invalidateQueries(eventsDefaultQueryKey);
            },
        },
    );

    const [deleteRangeEventsMutation, { isLoading: deleteRangeEventLoading }] = useMutation(
        async ({ event, fromDate, toDate }: { event: EventInfo; fromDate: Date; toDate: Date }) => {
            const apiParams: ApiEventParams = {
                recurrenceRuleId: event.resource.recurrenceRule?.id,
                fromDate: fromDate.toISOString().slice(0, -2),
                toDate: toDate.toISOString().slice(0, -2),
            };
            await deleteEvents(apiParams, keycloak.token);
        },
        {
            onSuccess: () => {
                alert.show('Slettingen var vellykket.', { type: types.SUCCESS });
                if (props.afterDeleteRangeEvent) {
                    props.afterDeleteRangeEvent(true);
                }
            },
            onError: () => {
                alert.show('Noe gikk galt, avtalen(e) ble ikke slettet.', { type: types.ERROR });
                if (props.afterDeleteRangeEvent) {
                    props.afterDeleteRangeEvent(false);
                }
            },
            onSettled: () => {
                queryCache.invalidateQueries(eventsDefaultQueryKey);
            },
        },
    );

    const [updateEventMutation, { isLoading: updateEventLoading }] = useMutation(
        async (updatedEvent: ApiEventPatch) => {
            await patchEvent(updatedEvent, keycloak.token);
        },
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

    const handleEditSubmission = async () => {
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
            alert.show('Start tiden kan ikke vøre etter slutt tiden.', { type: types.ERROR });
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
            startDateTime: start.toISOString().slice(0, -2),
            endDateTime: end.toISOString().slice(0, -2),
        };

        await updateEventMutation(updatedEvent);
    };

    return (
        <EventTemplateHorizontal
            title={props.event.title}
            hideTitleBar={props.hideTitleBar}
            showEditSymbol={isAdmin || (isStation && stationOwnsEvent)}
            isEditing={isEditing}
            onEditClick={() => setIsEditing(true)}
        >
            <Body>
                <Section>
                    <Options>
                        <EventOptionDateRange
                            dateRange={dateRange}
                            timeRange={timeRange}
                            recurring={recurring}
                            selectedDays={selectedDays}
                            isEditing={isEditing}
                            onDateRangeChange={setDateRange}
                            onTimeRangeChange={setTimeRange}
                            onRecurringChange={setReccuring}
                            onSelectedDaysChange={setSelectedDays}
                            recurrenceEnabled={false}
                        />
                        <EventOptionLocation
                            isEditing={false}
                            selectedLocation={props.event.resource.location.id}
                            locations={[props.event.resource.location]}
                        />
                    </Options>
                </Section>
                {!isEditing && (
                    <Section>
                        <EventMessageBox {...props.event.resource.message} />
                        {(isAdmin || (isPartner && partnerOwnsEvent) || (isStation && stationOwnsEvent)) && (
                            <>
                                <Button
                                    text="Avlys uttak"
                                    onClick={handleDeleteConfirmationClick}
                                    color="Red"
                                    styling="margin-top: 10px;"
                                />
                                {isDeletionConfirmationVisible && (
                                    <DeleteEvent
                                        allowRangeDeletion={isAdmin || (isStation && stationOwnsEvent)}
                                        onSubmit={handleDeleteEvent}
                                        loading={deleteSingleEventLoading || deleteRangeEventLoading}
                                    />
                                )}
                            </>
                        )}
                    </Section>
                )}
            </Body>
            {isEditing && (
                <EventSubmission
                    onSubmit={handleEditSubmission}
                    onCancel={handleEditCancelled}
                    isLoading={updateEventLoading}
                />
            )}
        </EventTemplateHorizontal>
    );
};
