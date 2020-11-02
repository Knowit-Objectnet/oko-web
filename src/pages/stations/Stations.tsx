import * as React from 'react';
import styled from 'styled-components';
import { Roles } from '../../types';
import { Station } from './Station';
import { Loading } from '../../sharedComponents/Loading';
import Plus from '../../assets/Plus.svg';
import useModal from '../../sharedComponents/Modal/useModal';
import { NewStation } from '../../sharedComponents/NewStation/NewStation';
import keycloak from '../../keycloak';
import { Helmet } from 'react-helmet';
import useStations from '../../api/hooks/useStations';

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

const Item = styled.div`
    position: absolute;
    top: 20px;
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
    const modal = useModal();
    const { data: stations, isLoading: isValidating } = useStations();

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const handleNewStationClick = () => {
        modal.show(<NewStation afterSubmit={closeModalOnSuccess} />);
    };

    if (!stations && isValidating) {
        return <Loading text="Laster inn data..." />;
    }

    return (
        <>
            <Helmet>
                <title>Stasjonene</title>
            </Helmet>
            <Wrapper>
                {keycloak.hasRealmRole(Roles.Oslo) && (
                    <Item>
                        <Description>Ny stasjon</Description>
                        <Button>
                            <Plus height="100%" onClick={handleNewStationClick} />
                        </Button>
                    </Item>
                )}
                <Content>
                    {stations?.map((station) => (
                        <Station key={station.id} {...station} />
                    ))}
                </Content>
            </Wrapper>
        </>
    );
};
