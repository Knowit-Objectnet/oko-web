import * as React from 'react';
import styled from 'styled-components';
import { ApiPickUp, Roles } from '../../types';
import { PartnerRequestForm } from './PartnerRequestForm';
import { RequestForm } from './RequestForm';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useKeycloak } from '@react-keycloak/web';

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

const Registration = styled.div`
    border-left: 2px solid ${(props) => props.theme.colors.White};
    background-color: ${(props) => props.theme.colors.LightBlue};
    width: 350px;
`;

interface PickUpRequestProps {
    pickUp: ApiPickUp;
}

export const PickUpInfo: React.FC<PickUpRequestProps> = ({ pickUp }) => {
    const [keycloak] = useKeycloak();
    const groupId = keycloak.tokenParsed.GroupID;

    const pickUpStartDateTime = new Date(pickUp.startDateTime);
    const pickUpEndDateTime = new Date(pickUp.endDateTime);
    const pickUpShortDate = format(pickUpStartDateTime, 'dd.MM.yyyy');
    const pickUpLongDate = format(pickUpStartDateTime, 'eee. dd. MMMM yyyy', { locale: nb });
    const pickUpStartTime = format(pickUpStartDateTime, 'HH:mm');
    const pickUpEndTime = format(pickUpEndDateTime, 'HH:mm');

    return (
        <Wrapper>
            <Content>
                <LocationDate>
                    <Location>{pickUp.station.name}</Location>
                    <span>{pickUpShortDate}</span>
                </LocationDate>
                <Event>{`${pickUpStartTime}–${pickUpEndTime}, ${pickUpLongDate}`}</Event>
                <Registration>
                    {keycloak.hasRealmRole(Roles.Partner) && groupId ? (
                        <PartnerRequestForm partnerId={groupId} pickUp={pickUp} />
                    ) : (
                        <RequestForm
                            pickupId={pickUp.id}
                            selectedPartnerId={pickUp.chosenPartner?.id}
                            isStation={groupId === pickUp.station.id}
                        />
                    )}
                </Registration>
            </Content>
            {pickUp.description && (
                <Description>
                    <strong>Merknad:</strong> {pickUp.description}
                </Description>
            )}
        </Wrapper>
    );
};
