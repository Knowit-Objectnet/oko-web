import * as React from 'react';
import styled from 'styled-components';
import { PickUpListItem } from './PickUpListItem';
import { usePickUps } from '../../../services/hooks/usePickUps';
import { ApiPickUpParams } from '../../../services/PickUpService';
import { useAuth } from '../../../auth/useAuth';
import compareDesc from 'date-fns/compareDesc';

const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: minmax(150px, 1fr) 8fr minmax(300px, 3fr);
`;

const PickUpRows = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding-left: 0;
    margin: 0.5rem 0 0;

    & > *:not(:last-child) {
        margin-bottom: 10px;
    }
`;

export const PickUpList: React.FC = () => {
    const { user } = useAuth();

    const pickUpsFilter: ApiPickUpParams = {
        stationId: user.isStasjon ? user.aktorId : undefined,
    };
    const { data: pickUps, isLoading, isError } = usePickUps(pickUpsFilter);
    const sortedPickups = (pickUps ?? []).sort((pickUpA, pickUpB) => {
        const dateTimeComparisonAsc = compareDesc(new Date(pickUpA.startDateTime), new Date(pickUpB.startDateTime));
        if (dateTimeComparisonAsc === 0) {
            return pickUpB.id - pickUpA.id;
        }
        return dateTimeComparisonAsc;
    });

    const renderPickUpsList = () => {
        if (isLoading) {
            return <p>Laster inn...</p>;
        }
        if (isError) {
            return <p>Noe gikk galt, kunne ikke laste inn ekstrauttak.</p>;
        }
        if (sortedPickups.length === 0) {
            return <p>Det er ikke registrert noen ekstrauttak enda.</p>;
        }
        return (
            <>
                <HeaderRow>
                    <div>Sendt av:</div>
                    <div>Uttak:</div>
                    <div>{user.isStasjon ? 'Handlingsalternativer:' : 'Påmeldte:'}</div>
                </HeaderRow>
                <PickUpRows>
                    {sortedPickups.map((pickUp) => (
                        <PickUpListItem key={pickUp.id} pickUp={pickUp} />
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
