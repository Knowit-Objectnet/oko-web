import * as React from 'react';
import styled from 'styled-components';
import { format, formatISO } from 'date-fns';
import { nb } from 'date-fns/locale';
import { PartnerRequestStatus } from './PartnerRequestStatus';
import { RequestsStatusList } from './RequestsStatusList';
import { ApiPickUp } from '../../../../services/_deprecated/PickUpService';
import { useAuth } from '../../../../auth/useAuth';

const Wrapper = styled.li`
    width: 100%;
    display: grid;
    grid-template-columns: minmax(150px, 1fr) 8fr minmax(300px, 3fr);
    grid-column-gap: 0.125rem;

    & > * {
        background-color: ${(props) => props.theme.colors.LightBlue};
    }
`;

const Details = styled.div`
    padding: 0.625rem;
`;

const Description = styled.div`
    border: 0.125rem solid ${(props) => props.theme.colors.LightBlue};
    border-top: none;
    background: none;
    grid-column-start: 1;
    grid-column-end: -1;
    padding: 0.625rem;
`;

interface Props {
    pickUp: ApiPickUp;
}

export const PickUpListItem: React.FC<Props> = ({ pickUp }) => {
    const { user } = useAuth();

    const startDateTime = new Date(pickUp.startDateTime);
    const endDateTime = new Date(pickUp.endDateTime);

    const pickUpStartTime = format(startDateTime, 'HH:mm');
    const pickUpEndTime = format(endDateTime, 'HH:mm');
    const pickUpDate = format(startDateTime, ' eee. d. MMMM yyyy', { locale: nb });

    // TODO: this should be 'createdDateTime' (not startDateTime) when backend supports it
    const pickUpCreatedTime = format(startDateTime, 'dd.MM.yyyy');

    const getMachineReadableDate = (date: Date) => format(date, 'yyyy-MM-dd');

    return (
        <Wrapper>
            <Details>
                <strong>{pickUp.station.name}</strong>
                <br />
                <time dateTime={getMachineReadableDate(startDateTime)}>{pickUpCreatedTime}</time>
            </Details>
            <Details>
                <time dateTime={formatISO(startDateTime)}>{pickUpStartTime}</time>&ndash;
                <time dateTime={formatISO(endDateTime)}>{pickUpEndTime}</time>{' '}
                <time dateTime={getMachineReadableDate(startDateTime)}>{pickUpDate}</time>
            </Details>
            {user.isPartner ? <PartnerRequestStatus pickUp={pickUp} /> : <RequestsStatusList pickUp={pickUp} />}
            {pickUp.description && (
                <Description>
                    <strong>Merknad:</strong> {pickUp.description}
                </Description>
            )}
        </Wrapper>
    );
};
