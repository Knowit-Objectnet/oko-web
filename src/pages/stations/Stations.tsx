import * as React from 'react';
import styled from 'styled-components';
import { ApiLocation, apiUrl, Colors, Roles } from '../../types';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Station } from './Station';
import { Loading } from '../../sharedComponents/Loading';
import Plus from '../../assets/Plus.svg';
import { types, useAlert } from 'react-alert';
import { FetchError } from '../../utils/FetchError';
import useModal from '../../sharedComponents/Modal/useModal';
import { NewLocation } from '../../sharedComponents/NewLocation';
import keycloak from '../../keycloak';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;
    background-color: ${Colors.White};
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
    background-color: ${Colors.LightBeige};
`;

const Button = styled.div`
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: ${Colors.Green};
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
    // Alert dispatcher
    const alert = useAlert();
    // Modal dispatcher
    const modal = useModal();
    // List of stations
    const { data: apiLocations, isValidating, mutate } = useSWR<Array<ApiLocation>>(`${apiUrl}/stations`, fetcher);
    const locations = apiLocations || [];

    const beforeSubmit = async (
        key: string,
        name: string,
        monday: [Date, Date, boolean],
        tuesday: [Date, Date, boolean],
        wednesday: [Date, Date, boolean],
        thursday: [Date, Date, boolean],
        friday: [Date, Date, boolean],
        saturday: [Date, Date, boolean],
        sunday: [Date, Date, boolean],
    ) => {
        const newLocation: ApiLocation = {
            id: -1,
            name: name,
            openingTime: `${monday[0].getHours()}:${monday[0].getMinutes()}:00Z`,
            closingTime: `${monday[1].getHours()}:${monday[1].getMinutes()}:00Z`,
        };

        const oldLocations = apiLocations || [];

        await mutate([...oldLocations, newLocation], false);

        modal.remove();
    };
    const afterSubmit = (successful: boolean, key: string, error: Error | null) => {
        if (successful) {
            alert.show('Ny stasjon ble lagt til suksessfullt.', { type: types.SUCCESS });

            mutate();
        } else {
            // Show appropriate error alert if something went wrong.
            if (error instanceof FetchError && error.code === 409) {
                alert.show('En stasjon med det navnet eksisterer allerede, vennligst velg et annet navn', {
                    type: types.ERROR,
                });
            } else {
                alert.show('Noe gikk galt, ny stasjon ble ikke lagt til.', { type: types.ERROR });
            }
        }
    };

    const onClick = () => {
        modal.show(<NewLocation beforeSubmit={beforeSubmit} afterSubmit={afterSubmit} />);
    };

    if (!apiLocations && isValidating) {
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
                            <Plus height="100%" onClick={onClick} />
                        </Button>
                    </Item>
                )}
                <Content>
                    {locations.map((location) => (
                        <Station key={`LocationId: ${location.id}`} {...location} />
                    ))}
                </Content>
            </Wrapper>
        </>
    );
};