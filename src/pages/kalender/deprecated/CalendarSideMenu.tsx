import * as React from 'react';
import styled from 'styled-components';
import Calendar from '../../../assets/Calendar.svg';
import Plus from '../../../assets/Plus.svg';
import { FloatingActionButton } from '../../../components/_deprecated/FloatingActionButton';
import { getStartAndEndDateTime } from '../../../utils/getStartAndEndDateTime';
import { NewEvent } from '../../../components/_deprecated/events/NewEvent';
import { NewPickUp } from '../../../components/_deprecated/events/NewPickUp';
import useModal from '../../../components/_deprecated/modal/useModal';
import { useAuth } from '../../../auth/useAuth';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`;

interface Props {
    onCalendarToggleClick: () => void;
}

export const CalendarSideMenu: React.FC<Props> = (props) => {
    const { user } = useAuth();

    const modal = useModal();

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const showNewEventModal = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<NewEvent start={start} end={end} afterSubmit={closeModalOnSuccess} />);
    };

    const showNewPickUpModal = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<NewPickUp start={start} end={end} afterSubmit={closeModalOnSuccess} />);
    };

    return (
        <Wrapper>
            {user.isAdmin && (
                <FloatingActionButton
                    label="Ny avtale"
                    hideLabel
                    icon={<Plus />}
                    variant="positive"
                    onClick={showNewEventModal}
                />
            )}
            {user.isStasjon && (
                <FloatingActionButton
                    label="Nytt ekstrauttak"
                    hideLabel
                    icon={<Plus />}
                    variant="positive"
                    onClick={showNewPickUpModal}
                />
            )}
            {user.isPartner && (
                <FloatingActionButton
                    label="Endre visning"
                    hideLabel
                    icon={<Calendar />}
                    variant="positive"
                    onClick={props.onCalendarToggleClick}
                />
            )}
        </Wrapper>
    );
};
