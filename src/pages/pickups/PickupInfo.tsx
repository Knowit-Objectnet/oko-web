import * as React from 'react';
import styled from 'styled-components';
import { Pickup, Roles } from '../../types';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { RequestList } from './RequestList';
import { useKeycloak } from '@react-keycloak/web';
import { PartnerRequestForm } from './PartnerRequestForm';

const Wrapper = styled.div`
    width: 100%;

    &:not(last-child) {
        margin-bottom: 10px;
    }
`;

const Content = styled.div`
    width: 100%;
    display: flex;
`;

const Description = styled.div`
    border: 2px solid ${(props) => props.theme.colors.LightBlue};
    border-top: none;
    padding: 10px;
    box-sizing: border-box;
`;

const LocationDate = styled.div`
    width: 150px;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.LightBlue};
`;

const Location = styled.span`
    font-weight: bold;
    margin-bottom: 4px;
`;

const Event = styled.div`
    flex: 1;
    border-left: 2px solid ${(props) => props.theme.colors.White};
    background-color: ${(props) => props.theme.colors.LightBlue};
    padding: 10px;
    box-sizing: border-box;
`;

const PickupRequests = styled.div`
    border-left: 2px solid ${(props) => props.theme.colors.White};
    background-color: ${(props) => props.theme.colors.LightBlue};
    width: 350px;
`;

export const PickupInfo: React.FC<{ pickup: Pickup }> = ({ pickup }) => {
    const [keycloak] = useKeycloak();
    const groupId = keycloak.tokenParsed.GroupID;

    const pickupStartDateTime = new Date(pickup.startDateTime);
    const pickupEndDateTime = new Date(pickup.endDateTime);
    const pickupShortDate = format(pickupStartDateTime, 'dd.MM.yyyy');
    const pickupLongDate = format(pickupStartDateTime, 'eee. dd. MMMM yyyy', { locale: nb });
    const pickupStartTime = format(pickupStartDateTime, 'HH:mm');
    const pickupEndTime = format(pickupEndDateTime, 'HH:mm');

    return (
        <Wrapper>
            <Content>
                <LocationDate>
                    <Location>{pickup.station.name}</Location>
                    <span>{pickupShortDate}</span>
                </LocationDate>
                <Event>{`${pickupStartTime}–${pickupEndTime}, ${pickupLongDate}`}</Event>
                <PickupRequests>
                    {keycloak.hasRealmRole(Roles.Partner) && groupId ? (
                        <PartnerRequestForm pickup={pickup} />
                    ) : (
                        <RequestList pickup={pickup} />
                    )}
                </PickupRequests>
            </Content>
            {pickup.description && (
                <Description>
                    <strong>Merknad:</strong> {pickup.description}
                </Description>
            )}
        </Wrapper>
    );
};
