import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { EventMessageBox } from './EventMessageBox';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventSubmission } from './EventSubmission';
import { apiUrl, EventInfo, Roles } from '../../types';
import { EventOptionLocation } from './EventOptionLocation';
import { EventTemplateHorizontal } from './EventTemplateHorizontal';
import { useKeycloak } from '@react-keycloak/web';
import { useAlert, types } from 'react-alert';
import { DeleteEvent } from './DeleteEvent';
import { Button } from '../Button';
import { PatchToAPI } from '../../utils/PatchToAPI';
import { DeleteToAPI } from '../../utils/DeleteToAPI';

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

interface EventProps extends EventInfo {
    beforeDeleteSingleEvent?: (key: string, event: EventInfo) => void;
    afterDeleteSingleEvent?: (successful: boolean, key: string) => void;
    beforeDeleteRangeEvent?: (key: string, event: EventInfo, range: [Date, Date]) => void;
    afterDeleteRangeEvent?: (successful: boolean, key: string) => void;
    beforeUpdateEvent?: (key: string, eventId: number, start: string, end: string) => void;
    afterUpdateEvent?: (successful: boolean, key: string) => void;
}

/**
 * Component shown when event in calendar is clicked.
 * Will be rendered differently depending on user's role.
 */
export const Event: React.FC<EventProps> = (props) => {
    // Alert dispatcher
    const alert = useAlert();
    // Keycloak instance
    const { keycloak } = useKeycloak();

    // State
    const [isEditing, setIsEditing] = useState(false);
    const [dateRange, setDateRange] = useState<[Date, Date]>([props.start, props.end]);
    const [timeRange, setTimeRange] = useState<[Date, Date]>([props.start, props.end]);
    const [recurring, setReccuring] = useState<'None' | 'Daily' | 'Weekly'>('None');
    const [selectedDays, setSelectedDays] = useState([1]);
    const [isDeletionConfirmationVisible, setIsDeletionConfirmationVisible] = useState(false);

    // On change functions for DateRange
    const onDateRangeChange = (range: [Date, Date]) => {
        setDateRange(range);
    };

    const onTimeRangeChange = (range: [Date, Date]) => {
        setTimeRange(range);
    };

    const onRecurringChange = (value: 'None' | 'Daily' | 'Weekly') => {
        setReccuring(value);
    };

    const onSelectedDaysChange = (num: Array<number>) => {
        setSelectedDays(num);
    };

    // On change function for the Edit button
    const onEditClick = () => {
        setIsEditing(true);
    };

    const onDeleteConfirmationClick = () => {
        setIsDeletionConfirmationVisible(!isDeletionConfirmationVisible);
    };

    const onDelete = (range: [Date, Date], isSingleDeletion: boolean) => {
        const {
            beforeDeleteSingleEvent,
            afterDeleteSingleEvent,
            beforeDeleteRangeEvent,
            afterDeleteRangeEvent,
            beforeUpdateEvent,
            afterUpdateEvent,
            ...rest
        } = props;
        if (isSingleDeletion) {
            deleteSingleEvent(rest);
        } else {
            deleteRangeEvents(rest, range);
        }
    };

    const deleteSingleEvent = async (event: EventInfo) => {
        try {
            if (props.beforeDeleteSingleEvent) {
                props.beforeDeleteSingleEvent(`${apiUrl}/events?eventId=${event.resource.eventId}`, event);
            }
            // send a request to the API to update the source
            await DeleteToAPI(`${apiUrl}/events?eventId=${event.resource.eventId}`, keycloak.token);

            if (props.afterDeleteSingleEvent) {
                props.afterDeleteSingleEvent(true, `${apiUrl}/events?eventId=${event.resource.eventId}`);
            }
        } catch (err) {
            if (props.afterDeleteSingleEvent) {
                props.afterDeleteSingleEvent(false, `${apiUrl}/events?eventId=${event.resource.eventId}`);
            }
        }
    };

    const deleteRangeEvents = async (event: EventInfo, range: [Date, Date]) => {
        if (!event.resource.recurrenceRule) {
            await deleteSingleEvent(event);
            return;
        }

        try {
            if (props.beforeDeleteRangeEvent) {
                props.beforeDeleteRangeEvent(`${apiUrl}/events`, event, range);
            }
            // send a request to the API to update the source
            await DeleteToAPI(
                `${apiUrl}/events?recurrenceRuleId=${
                    event.resource.recurrenceRule?.id
                }&fromDate=${range[0].toISOString().slice(0, -2)}&toDate=${range[1].toISOString().slice(0, -2)}`,
                keycloak.token,
            );

            if (props.afterDeleteRangeEvent) {
                props.afterDeleteRangeEvent(true, `${apiUrl}/events`);
            }
        } catch (err) {
            if (props.afterDeleteRangeEvent) {
                props.afterDeleteRangeEvent(false, `${apiUrl}/events`);
            }
        }
    };

    // Function called if edit was cancelled. Resets all values to the original event info
    const onCancel = () => {
        setIsEditing(false);
        setDateRange([props.start, props.end]);
        setTimeRange([props.start, props.end]);
    };

    // Function called on successful event edit.
    const onSubmit = async () => {
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

        try {
            if (props.beforeUpdateEvent) {
                props.beforeUpdateEvent(
                    `${apiUrl}/events`,
                    props.resource.eventId,
                    start.toISOString(),
                    end.toISOString(),
                );
            }
            // send a request to the API to update the source
            await PatchToAPI(
                `${apiUrl}/events`,
                {
                    id: props.resource.eventId,
                    startDateTime: start.toISOString().slice(0, -2),
                    endDateTime: end.toISOString().slice(0, -2),
                },
                keycloak.token,
            );
            if (props.afterUpdateEvent) {
                props.afterUpdateEvent(true, `${apiUrl}/events`);
            }
        } catch {
            if (props.afterUpdateEvent) {
                props.afterUpdateEvent(false, `${apiUrl}/events`);
            }
        }
    };

    return (
        <EventTemplateHorizontal
            title={props.title}
            showEditSymbol={
                keycloak.hasRealmRole(Roles.Oslo) ||
                (keycloak.hasRealmRole(Roles.Ambassador) && keycloak.tokenParsed.GroupID === props.resource.location.id)
            }
            isEditing={isEditing}
            onEditClick={onEditClick}
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
                            onDateRangeChange={onDateRangeChange}
                            onTimeRangeChange={onTimeRangeChange}
                            onRecurringChange={onRecurringChange}
                            onSelectedDaysChange={onSelectedDaysChange}
                            recurrenceEnabled={false}
                        />
                        <EventOptionLocation
                            isEditing={false}
                            selectedLocation={props.resource.location.id}
                            locations={[props.resource.location]}
                            onChange={() => {
                                /* TODO: make it so that we don't need this nop func */
                            }}
                        />
                    </Options>
                </Section>
                {!isEditing && (
                    <Section>
                        <EventMessageBox {...props.resource.message} />
                        {(keycloak.hasRealmRole(Roles.Oslo) ||
                            (keycloak.hasRealmRole(Roles.Partner) &&
                                keycloak.tokenParsed.GroupID === props.resource.partner.id) ||
                            (keycloak.hasRealmRole(Roles.Ambassador) &&
                                keycloak.tokenParsed.GroupID === props.resource.location.id)) && (
                            <>
                                <Button
                                    text="Avlys uttak"
                                    onClick={onDeleteConfirmationClick}
                                    color="Red"
                                    styling="margin-top: 10px;"
                                />
                                {isDeletionConfirmationVisible && (
                                    <DeleteEvent
                                        allowRangeDeletion={
                                            keycloak.hasRealmRole(Roles.Oslo) ||
                                            (keycloak.hasRealmRole(Roles.Ambassador) &&
                                                keycloak.tokenParsed.GroupID === props.resource.location.id)
                                        }
                                        onSubmit={onDelete}
                                    />
                                )}
                            </>
                        )}
                    </Section>
                )}
            </Body>
            {isEditing && <EventSubmission onSubmit={onSubmit} onCancel={onCancel} />}
        </EventTemplateHorizontal>
    );
};
