import * as React from 'react';
import styled from 'styled-components';
import { Partner, Pickup, Request } from '../../types';
import { Button } from '../../sharedComponents/Button';
import { usePickups } from '../../services/usePickups';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';

const Partner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 5px;
    box-sizing: border-box;

    &:not(:last-child) {
        border-bottom: 2px solid ${(props) => props.theme.colors.White};
    }
`;

const PartnerName = styled.div`
    font-weight: bold;
`;

const Selection = styled.div`
    display: flex;
`;

const Reject = styled.div`
    margin-right: 10px;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
`;

interface StatusProps {
    approved: boolean;
}

const Status = styled.div<StatusProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    width: 90px;
    height: 22px;
    background-color: ${(props) => (props.approved ? props.theme.colors.Green : props.theme.colors.Red)};
    font-weight: bold;
    font-size: 12px;
`;

const Waiting = styled.div`
    font-style: italic;
    font-size: 12px;
    line-height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

interface RequestProps {
    pickup: Pickup;
    request: Request;
}

export const RequestApprovalForm: React.FC<RequestProps> = ({ pickup, request }) => {
    const { updatePickup } = usePickups();
    const alert = useAlert();

    const [keycloak] = useKeycloak();
    const isStation = keycloak.tokenParsed.GroupID === pickup.station.id;

    const rejectRequest = () => {
        // TODO: Currently not used as backend doesnt support it
        console.log('Rejection of requests is not yet implemented in backend');
    };

    const approveRequest = async () => {
        try {
            await updatePickup({ id: pickup.id, chosenPartnerId: request.partner.id });
            alert.show('Valg av sam.partner til ekstrauttak ble registrert suksessfullt.', { type: types.SUCCESS });
        } catch {
            alert.show('Noe gikk galt, valg av sam.partner til ekstrauttak ble ikke registrert.', {
                type: types.ERROR,
            });
        }
    };

    return (
        <Partner>
            <PartnerName>{request.partner.name}</PartnerName>
            {isStation && !pickup.chosenPartner ? (
                <Selection>
                    {/*
                        <Reject onClick={onReject}>
                            <Cross height="1em" /> Avvis
                        </Reject>
                    */}
                    <Button text="Godkjenn" color="Green" height={22} onClick={approveRequest} />
                </Selection>
            ) : pickup.chosenPartner ? (
                <Status approved={request.partner.id === pickup.chosenPartner.id}>
                    {request.partner.id === pickup.chosenPartner.id ? 'Godkjent' : 'Avvist'}
                </Status>
            ) : (
                <Waiting>Avventer svar</Waiting>
            )}
        </Partner>
    );
};
