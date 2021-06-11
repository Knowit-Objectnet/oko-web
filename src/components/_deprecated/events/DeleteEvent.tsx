import * as React from 'react';
import styled from 'styled-components';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useState } from 'react';
import { PositiveButton } from '../buttons/PositiveButton';
import { useMutation, useQueryClient } from 'react-query';
import { EventInfo } from '../../../services/deprecated/types';
import { ApiEventParams, deleteEvents, eventsDefaultQueryKey } from '../../../services/deprecated/EventService';
import { types, useAlert } from 'react-alert';
import { useAuth } from '../../../auth/useAuth';

const Wrapper = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: ${(props) => props.theme.colors.White};
    display: flex;
    flex-direction: column;
    padding: 0.625rem;

    & > *:not(:last-child) {
        margin-bottom: 0.75rem;
    }
`;

const RangeSelection = styled.div`
    background-color: ${(props) => props.theme.colors.Yellow};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.125rem;
`;

const Selection = styled.div<{ selected?: boolean }>`
    background-color: ${(props) => props.selected && props.theme.colors.White};
    padding: 0.5rem;
    box-sizing: border-box;
    user-select: none;
`;

const StyledDateRangePicker = styled(DateRangePicker)`
    width: 100%;
    background-color: ${(props) => props.theme.colors.White};

    & .react-daterange-picker__range-divider {
        flex: auto;
    }
`;

interface DeleteEventProps {
    event: EventInfo;
    afterDeleteSingleEvent?: (successful: boolean) => void;
    afterDeleteRangeEvent?: (successful: boolean) => void;
}

export const DeleteEvent: React.FC<DeleteEventProps> = (props) => {
    const alert = useAlert();

    const { user } = useAuth();

    const eventIsRecurring = props.event.resource.recurrenceRule != null;
    const allowRangeDeletion =
        eventIsRecurring && (user.isAdmin || (user.isStasjon && user.ownsResource(props.event.resource.station.id)));

    const date = new Date();
    date.setHours(2, 0, 0, 0);
    const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(date), new Date(date)]);
    const [isSingleDeletion, setIsSingleDeletion] = useState(true);

    const setIsSingleDeletionClick = () => {
        setIsSingleDeletion(true);
    };

    const setIsRangeDeletionClick = () => {
        setIsSingleDeletion(false);
    };

    const queryClient = useQueryClient();
    const deleteSingleEventMutation = useMutation(
        (event: EventInfo) => deleteEvents({ eventId: event.resource.eventId }),
        {
            onSuccess: () => {
                alert.show('Avtalen ble slettet.', { type: types.SUCCESS });
                props.afterDeleteSingleEvent?.(true);
            },
            onError: () => {
                alert.show('Noe gikk kalt, avtalen ble ikke slettet.', { type: types.ERROR });
                props.afterDeleteSingleEvent?.(false);
            },
            onSettled: () => {
                queryClient.invalidateQueries(eventsDefaultQueryKey);
            },
        },
    );

    const deleteRangeEventsMutation = useMutation(
        ({ event, fromDate, toDate }: { event: EventInfo; fromDate: Date; toDate: Date }) => {
            const apiParams: ApiEventParams = {
                recurrenceRuleId: event.resource.recurrenceRule?.id,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString(),
            };
            return deleteEvents(apiParams);
        },
        {
            onSuccess: () => {
                alert.show('Avtalen(e) ble slettet.', { type: types.SUCCESS });
                props.afterDeleteRangeEvent?.(true);
            },
            onError: () => {
                alert.show('Noe gikk galt, avtalen(e) ble ikke slettet.', { type: types.ERROR });
                props.afterDeleteRangeEvent?.(false);
            },
            onSettled: () => {
                queryClient.invalidateQueries(eventsDefaultQueryKey);
            },
        },
    );

    const handleDeleteEvent = () => {
        if (isSingleDeletion || !eventIsRecurring) {
            deleteSingleEventMutation.mutate(props.event);
        } else {
            deleteRangeEventsMutation.mutate({ event: props.event, fromDate: dateRange[0], toDate: dateRange[1] });
        }
    };

    return (
        <Wrapper>
            {allowRangeDeletion && (
                <RangeSelection>
                    <Selection selected={isSingleDeletion} onClick={setIsSingleDeletionClick}>
                        Engangstilfelle
                    </Selection>
                    <Selection selected={!isSingleDeletion} onClick={setIsRangeDeletionClick}>
                        Over en periode
                    </Selection>
                </RangeSelection>
            )}
            {!isSingleDeletion && <StyledDateRangePicker clearIcon={null} onChange={setDateRange} value={dateRange} />}
            <PositiveButton
                onClick={handleDeleteEvent}
                isLoading={deleteSingleEventMutation.isLoading || deleteRangeEventsMutation.isLoading}
            >
                Bekreft
            </PositiveButton>
        </Wrapper>
    );
};
