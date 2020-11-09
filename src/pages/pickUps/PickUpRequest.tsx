import * as React from 'react';
import styled from 'styled-components';
import { Roles } from '../../types';
import { PartnerRequestForm } from './PartnerRequestForm';
import { Requests } from './Requests';
import { ApiPartner } from '../../api/PartnerService';
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

const Notice = styled.div`
    border: 2px solid ${(props) => props.theme.colors.LightBlue};
    border-top: none;
    padding: 10px;
    box-sizing: border-box;
`;

const NoticeText = styled.span`
    font-weight: bold;
    margin-right: 5px;
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

interface Props {
    pickUp: ApiPickUp;
}

export const PickUpRequest: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const userIsPartner = keycloak.hasRealmRole(Roles.Partner);
    const userId = keycloak.tokenParsed?.GroupID;

    const { pickUp } = props;
    const startDateTime = new Date(pickUp.startDateTime);
    const endDateTime = new Date(pickUp.endDateTime);
    return (
        <Wrapper>
            <Content>
                <LocationDate>
                    <Location>{pickUp.station.name}</Location>
                    {
                        // TODO: this should be 'createdDateTime', when backend supports it
                        format(startDateTime, 'dd.MM.yyyy')
                    }
                </LocationDate>
                <Event>
                    {format(startDateTime, 'HH:mm')}
                    &ndash;
                    {format(endDateTime, 'HH:mm')}
                    {format(startDateTime, ' eee. d. MMMM yyyy', { locale: nb })}
                </Event>
                <Registration>
                    {userIsPartner && userId ? (
                        <PartnerRequestForm
                            partnerId={userId}
                            selectedPartnerId={pickUp.chosenPartner?.id}
                            pickupId={pickUp.id}
                        />
                    ) : (
                        <Requests
                            pickupId={pickUp.id}
                            selectedPartnerId={pickUp.chosenPartner?.id}
                            isStation={pickUp.station.id === userId}
                        />
                    )}
                </Registration>
            </Content>
            {pickUp.description && (
                <Notice>
                    <NoticeText>Merknad:</NoticeText> {pickUp.description}
                </Notice>
            )}
        </Wrapper>
    );
};
