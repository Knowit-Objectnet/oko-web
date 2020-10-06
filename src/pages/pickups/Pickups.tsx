import * as React from 'react';
import styled from 'styled-components';
import { Pickup, Roles } from '../../types';
import { PickupInfo } from './PickupInfo';
import Plus from '../../assets/Plus.svg';
import { ExtraEvent } from '../../sharedComponents/Events/ExtraEvent';
import { useKeycloak } from '@react-keycloak/web';
import { Loading } from '../../sharedComponents/Loading';
import useModal from '../../sharedComponents/Modal/useModal';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { Helmet } from 'react-helmet';
import { usePickups } from '../../services/usePickups';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    margin-top: 90px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    height: 100%;
    overflow: auto;
`;

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const LocationHeader = styled.div`
    width: 150px;
`;

const PickupHeader = styled.div`
    flex: 1;
`;

const RequestHeader = styled.div`
    width: 350px;
`;

const PickupsList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const Item = styled.div`
    position: absolute;
    top: 40px;
    right: 50px;
    display: flex;
    flex-direction: row;
    &:not(:last-child) {
        margin-bottom: 25px;
    }
`;

const Description = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    background-color: ${(props) => props.theme.colors.LightBeige};
`;

const Button = styled.div`
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: ${(props) => props.theme.colors.Green};
    border-radius: 50%;
    box-sizing: border-box;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

export const Pickups: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed.GroupID;

    const modal = useModal();
    const { data: pickups, isValidating } = usePickups();

    const sortedPickups = (pickups ?? []).sort((pickupA, pickupB) => {
        const pickupAstart = new Date(pickupA.startDateTime);
        const pickupBstart = new Date(pickupB.startDateTime);

        if (pickupAstart > pickupBstart) {
            return -1;
        }
        if (pickupAstart < pickupBstart) {
            return 1;
        }
        return 0;

        // TODO: the pickups were also sorted by ID. Why is that, and should it be re-implemented?
    });

    const sortedAndFilteredPickups = keycloak.hasRealmRole(Roles.Ambassador)
        ? sortedPickups.filter((pickup: Pickup) => pickup.station.id === userId)
        : sortedPickups;

    const showNewExtraEventModal = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<ExtraEvent end={end} afterSubmit={afterExtraEventSubmission} start={start} />);
    };

    const afterExtraEventSubmission = (successful: boolean) => {
        if (successful) {
            modal.remove();
        }
    };

    return (
        <>
            <Helmet>
                <title>Ektrauttak</title>
            </Helmet>
            <Wrapper>
                {keycloak.hasRealmRole(Roles.Ambassador) && (
                    <Item>
                        <Description>Ektrauttak</Description>
                        <Button onClick={showNewExtraEventModal}>
                            <Plus height="100%" />
                        </Button>
                    </Item>
                )}
                <Content>
                    <h2>Forespørsler</h2>
                    <HeaderRow>
                        <LocationHeader>Sendt av:</LocationHeader>
                        <PickupHeader>Uttak:</PickupHeader>
                        <RequestHeader>
                            {keycloak.hasRealmRole(Roles.Ambassador) ? 'Handlingsalternativer:' : 'Påmeldte:'}
                        </RequestHeader>
                    </HeaderRow>
                    <PickupsList>
                        {!pickups && isValidating ? (
                            <Loading text="Laster inn data..." />
                        ) : (
                            sortedAndFilteredPickups.map((pickup) => <PickupInfo key={pickup.id} pickup={pickup} />)
                        )}
                    </PickupsList>
                </Content>
            </Wrapper>
        </>
    );
};
