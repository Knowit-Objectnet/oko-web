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
import { FloatingActionButton } from '../../sharedComponents/FloatingActionButton';

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

const AddStationButtonContainer = styled.div`
    position: absolute;
    top: 40px;
    right: 50px;
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

    const handleNewStationClick = () => {
        modal.show(<NewStation afterSubmit={closeModalOnSuccess} />);
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
                    <AddStationButtonContainer>
                        <FloatingActionButton
                            label="Ny stasjon"
                            icon={<Plus />}
                            onClick={handleNewStationClick}
                            variant="positive"
                        />
                    </AddStationButtonContainer>
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
