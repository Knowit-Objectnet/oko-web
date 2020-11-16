import * as React from 'react';
import styled from 'styled-components';
import { PickUpDetails } from './PickUpDetails';
import { useKeycloak } from '@react-keycloak/web';
import { Loading } from '../../../sharedComponents/Loading';
import { Roles } from '../../../types';
import { usePickUps } from '../../../api/hooks/usePickUps';
import { ApiPickUpParams } from '../../../api/PickUpService';
import { format } from 'date-fns';

const PickUps = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 40px 0 50px;
`;

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
        // TODO startDateTime: `${format(new Date().setDate(1), 'yyyy-MM-dd')}T00:00:00Z`,
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

    return isLoading ? (
        <Loading text="Laster inn data..." />
    ) : (
        <PickUps>
            <h2>Forespørsler</h2>
            {sortedPickups?.length ? (
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
            ) : (
                <p>Det er ikke registrert noen ekstrauttak enda.</p>
            )}
        </PickUps>
    );
};
