import * as React from 'react';
import styled from 'styled-components';
import { Roles } from '../../types';
import { Station } from './Station';
import { Loading } from '../../sharedComponents/Loading';
import Plus from '../../assets/Plus.svg';
import useModal from '../../sharedComponents/Modal/useModal';
import { NewStation } from '../../sharedComponents/NewStation/NewStation';
import { Helmet } from 'react-helmet';
import { useStations } from '../../api/hooks/useStations';
import { useKeycloak } from '@react-keycloak/web';
import { FloatingActionButton } from '../../sharedComponents/buttons/FloatingActionButton';
import { DeleteStation } from '../../sharedComponents/DeleteStation';
import Minus from '../../assets/Minus.svg';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;
    background-color: ${(props) => props.theme.colors.White};
`;

const StationAdminButtons = styled.div`
    position: absolute;
    top: 40px;
    right: 50px;
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
    margin-top: 75px;
    margin-bottom: 20px;
    overflow: auto;
`;

export const Stations: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);

    const modal = useModal();

    const { data: stations, isLoading } = useStations();

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const showNewStationModal = () => {
        modal.show(<NewStation afterSubmit={closeModalOnSuccess} />);
    };

    const showDeleteStationModal = () => {
        modal.show(<DeleteStation afterSubmit={closeModalOnSuccess} />);
    };

    if (isLoading) {
        return <Loading text="Laster inn data..." />;
    }

    return (
        <>
            <Helmet>
                <title>Stasjonene</title>
            </Helmet>
            <Wrapper>
                {userIsAdmin && (
                    <StationAdminButtons>
                        <FloatingActionButton
                            label="Ny stasjon"
                            icon={<Plus />}
                            onClick={showNewStationModal}
                            variant="positive"
                        />
                        <FloatingActionButton
                            label="Slett stasjon"
                            icon={<Minus />}
                            onClick={showDeleteStationModal}
                            variant="negative"
                        />
                    </StationAdminButtons>
                )}
                <Content>
                    {stations?.map((station) => (
                        <Station key={station.id} station={station} />
                    ))}
                </Content>
            </Wrapper>
        </>
    );
};
