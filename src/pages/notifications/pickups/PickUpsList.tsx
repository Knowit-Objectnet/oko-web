import * as React from 'react';
import styled from 'styled-components';
import { PickUpDetails } from './PickUpDetails';
import { useKeycloak } from '@react-keycloak/web';
import { Roles } from '../../../types';
import { usePickUps } from '../../../api/hooks/usePickUps';
import { ApiPickUpParams } from '../../../api/PickUpService';

const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: minmax(150px, 1fr) 8fr minmax(350px, 3fr);
`;

const PickUpRows = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
        margin-bottom: 10px;
    }
`;

export const PickUpsList: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userIsStation = keycloak.hasRealmRole(Roles.Ambassador);
    const userId = keycloak.tokenParsed?.GroupID;

    const pickUpsFilter: ApiPickUpParams = {
        stationId: userIsStation ? userId : undefined,
    };
    const { data: pickUps, isLoading } = usePickUps(pickUpsFilter);
    const sortedPickups = pickUps?.sort((pickUpA, pickUpB) => {
        const timeA = new Date(pickUpA.startDateTime);
        const timeB = new Date(pickUpB.startDateTime);
        if (timeA == timeB) {
            return pickUpB.id - pickUpA.id;
        } else {
            return timeB.getTime() - timeA.getTime();
        }
    });

    const renderPickUpsList = () => {
        if (isLoading) {
            return <p>Laster inn...</p>;
        }
        if (!sortedPickups?.length) {
            return <p>Det er ikke registrert noen ekstrauttak enda.</p>;
        }
        return (
            <>
                <HeaderRow>
                    <div>Sendt av:</div>
                    <div>Uttak:</div>
                    <div>{userIsStation ? 'Handlingsalternativer:' : 'Påmeldte:'}</div>
                </HeaderRow>
                <PickUpRows>
                    {sortedPickups.map((pickUp) => (
                        <PickUpDetails key={pickUp.id} pickUp={pickUp} />
                    ))}
                </PickUpRows>
            </>
        );
    };

    return (
        <>
            <h2>Forespørsler</h2>
            {renderPickUpsList()}
        </>
    );
};
