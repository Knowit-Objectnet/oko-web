import * as React from 'react';
import styled from 'styled-components';
import Calendar from '../../assets/Calendar.svg';
import Plus from '../../assets/Plus.svg';
import { Roles } from '../../types';
import { useKeycloak } from '@react-keycloak/web';
import { FloatingActionButton } from '../../components/buttons/FloatingActionButton';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { NewEvent } from '../../components/events/NewEvent';
import { NewPickUp } from '../../components/events/NewPickUp';
import useModal from '../../components/modal/useModal';

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
    const { keycloak } = useKeycloak();
    const userIsPartner = keycloak.hasRealmRole(Roles.Partner);
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);
    const userIsStation = keycloak.hasRealmRole(Roles.Ambassador);

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
            {userIsAdmin && (
                <FloatingActionButton
                    label="Ny avtale"
                    hideLabel
                    icon={<Plus />}
                    variant="positive"
                    onClick={showNewEventModal}
                />
            )}
            {userIsStation && (
                <FloatingActionButton
                    label="Nytt ekstrauttak"
                    hideLabel
                    icon={<Plus />}
                    variant="positive"
                    onClick={showNewPickUpModal}
                />
            )}
            {userIsPartner && (
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
