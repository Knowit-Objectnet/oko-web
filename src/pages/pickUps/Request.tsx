import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../../sharedComponents/Button';
import { ApiPartner } from '../../api/PartnerService';
import { PatchToAPI } from '../../utils/PatchToAPI';
import { apiUrl } from '../../types';
import { types, useAlert } from 'react-alert';
import { mutate } from 'swr';
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

interface Props {
    pickupId: number;
    partner: ApiPartner;
    selectedId?: number;
    isStation: boolean;
}

export const Request: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    // Function to handle the approval of a request
    const onApprove = async () => {
        try {
            await PatchToAPI(
                `${apiUrl}/pickups`,
                { id: props.pickupId, chosenPartnerId: props.partner.id },
                keycloak.token,
            );
            alert.show('Valg av sam.partner til ekstrauttak ble registrert suksessfullt.', { type: types.SUCCESS });
            mutate(`${apiUrl}/pickups/`);
        } catch {
            alert.show('Noe gikk galt, valg av sam.partner til ekstrauttak ble ikke registrert.', {
                type: types.ERROR,
            });
        }
    };

    return (
        <Partner>
            <PartnerName>{props.partner.name}</PartnerName>
            {props.isStation && !props.selectedId ? (
                <Selection>
                    {/*
                        <Reject onClick={onReject}>
                            <Cross height="1em" /> Avvis
                        </Reject>
                    */}
                    <Button text="Godkjenn" color="Green" height={22} onClick={onApprove} />
                </Selection>
            ) : props.selectedId ? (
                <Status approved={props.partner.id === props.selectedId}>
                    {props.partner.id === props.selectedId ? 'Godkjent' : 'Avvist'}
                </Status>
            ) : (
                <Waiting>Avventer svar</Waiting>
            )}
        </Partner>
    );
};
