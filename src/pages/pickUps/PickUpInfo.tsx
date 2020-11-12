import * as React from 'react';
import styled from 'styled-components';
import { Roles } from '../../types';
import { PartnerRequestForm } from './PartnerRequestForm';
import { Requests } from './Requests';
import { ApiPickUp } from '../../api/PickUpService';
import { format } from 'date-fns';
import { useKeycloak } from '@react-keycloak/web';
import { nb } from 'date-fns/locale';

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
`;

const StationWithDate = styled.div`
    width: 150px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.LightBlue};
`;

const DateTime = styled.div`
    flex: 1;
    border-left: 2px solid ${(props) => props.theme.colors.White};
    background-color: ${(props) => props.theme.colors.LightBlue};
    padding: 10px;
    box-sizing: border-box;
`;

const PickUpRequest = styled.div`
    border-left: 2px solid ${(props) => props.theme.colors.White};
    background-color: ${(props) => props.theme.colors.LightBlue};
    width: 350px;
`;

interface Props {
    pickUp: ApiPickUp;
}

export const PickUpInfo: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);
    const userIsStation = keycloak.hasRealmRole(Roles.Ambassador);
    const userIsPartner = keycloak.hasRealmRole(Roles.Partner);
    const userId = keycloak.tokenParsed?.GroupID;

    const { pickUp } = props;
    const startDateTime = new Date(pickUp.startDateTime);
    const endDateTime = new Date(pickUp.endDateTime);

    const pickUpStartTime = format(startDateTime, 'HH:mm');
    const pickUpEndTime = format(endDateTime, 'HH:mm');
    const pickUpDate = format(startDateTime, ' eee. d. MMMM yyyy', { locale: nb });
    // TODO: this should be 'createdDateTime', when backend supports it
    const pickUpCreatedDate = format(startDateTime, 'dd.MM.yyyy');

    const getRequestForm = () => {
        if (userIsPartner) {
            return (
                <PartnerRequestForm
                    pickupId={pickUp.id}
                    selectedPartnerId={pickUp.chosenPartner?.id}
                    partnerId={userId}
                />
            );
        } else {
            return (
                <Requests
                    pickupId={pickUp.id}
                    selectedPartnerId={pickUp.chosenPartner?.id}
                    isStation={pickUp.station.id === userId}
                />
            );
        }
    };

    return (
        <Wrapper>
            <Content>
                <StationWithDate>
                    <strong>{pickUp.station.name}</strong>
                    {pickUpCreatedDate}
                </StationWithDate>
                <DateTime>
                    {pickUpStartTime}&ndash;{pickUpEndTime} {pickUpDate}
                </DateTime>
                <PickUpRequest>{getRequestForm()}</PickUpRequest>
            </Content>
            {pickUp.description && (
                <Description>
                    <strong>Merknad:</strong> {pickUp.description}
                </Description>
            )}
        </Wrapper>
    );
};
