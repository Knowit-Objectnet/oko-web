import * as React from 'react';
import styled from 'styled-components';
import { ApiPartner, Colors, PickUp, Roles } from '../../types';
import keycloak from '../../keycloak';
import { PartnerRequestForm } from './PartnerRequestForm';
import { Requests } from './Requests';

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
    border: 2px solid ${Colors.LightBlue};
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
    background-color: ${Colors.LightBlue};
`;

const Location = styled.span`
    font-weight: bold;
    margin-bottom: 4px;
`;

const Event = styled.div`
    flex: 1;
    border-left: 2px solid ${Colors.White};
    background-color: ${Colors.LightBlue};
    padding: 10px;
    box-sizing: border-box;
`;

const Registration = styled.div`
    border-left: 2px solid ${Colors.White};
    background-color: ${Colors.LightBlue};
    width: 350px;
`;

interface PickUpRequestProps extends PickUp {
    groupId?: number;
    registerRequest: (pickupId: number, partnerId: number) => void;
    deleteRequest: (pickupId: number, partnerId: number) => void;
    onReject: (partner: ApiPartner, pickupId: number) => void;
    onApprove: (partner: ApiPartner, pickupId: number) => void;
}

export const PickUpRequest: React.FC<PickUpRequestProps> = (props) => {
    return (
        <Wrapper>
            <Content>
                <LocationDate>
                    <Location>{props.station.name}</Location>
                    <span>{`${props.startDateTime
                        .getDate()
                        .toString()
                        .padStart(2, '0')}.${props.startDateTime
                        .getMonth()
                        .toString()
                        .padStart(2, '0')}.${props.startDateTime.getFullYear().toString().padStart(2, '0')}`}</span>
                </LocationDate>
                <Event>
                    {`${props.startDateTime
                        .getHours()
                        .toString()
                        .padStart(2, '0')}:${props.startDateTime
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')} - ${props.endDateTime
                        .getHours()
                        .toString()
                        .padStart(2, '0')}:${props.endDateTime
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')} ${props.startDateTime.toLocaleString('nb-NO', {
                        weekday: 'short',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}`}
                </Event>
                <Registration>
                    {keycloak.hasRealmRole(Roles.Partner) && props.groupId ? (
                        <PartnerRequestForm
                            partnerId={props.groupId}
                            pickupId={props.id}
                            deleteRequest={props.deleteRequest}
                            registerRequest={props.registerRequest}
                        />
                    ) : (
                        <Requests
                            pickupId={props.id}
                            selectedPartnerId={props.chosenPartner?.id}
                            isStation={props.groupId === props.station.id}
                            onApprove={props.onApprove}
                            onReject={props.onReject}
                        />
                    )}
                </Registration>
            </Content>
            {props.description ? (
                <Notice>
                    <NoticeText>Merknad:</NoticeText> {props.description}
                </Notice>
            ) : null}
        </Wrapper>
    );
};
