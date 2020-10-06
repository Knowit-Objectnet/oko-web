import * as React from 'react';
import styled from 'styled-components';
import { Pickup } from '../../types';
import { Button } from '../../sharedComponents/Button';
import Cross from '../../assets/Cross.svg';
import { Colors } from '../../theme';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { useRequests } from '../../services/useRequests';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
`;

const DeleteButton = styled.button`
    border: 0;
    background: none;
    margin-left: 10px;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
`;

export const PartnerRequestForm: React.FC<{ pickup: Pickup }> = ({ pickup }) => {
    const alert = useAlert();

    const [keycloak] = useKeycloak();
    const partnerId = keycloak.tokenParsed.GroupID;
    const selectedPartnerId = pickup.chosenPartner?.id;
    const pickupId = pickup.id;

    const { data: request, isValidating, mutate, addRequest, deleteRequest } = useRequests({
        pickupId,
        partnerId,
    });

    const onDeleteClick = async () => {
        try {
            await deleteRequest(pickupId, partnerId);
            alert.show('Påmelding til ekstrauttak ble slettet suksessfullt.', { type: types.SUCCESS });
            mutate();
        } catch {
            alert.show('Noe gikk galt, sletting av påmelding til ekstrauttaket ble ikke registrert.', {
                type: types.ERROR,
            });
        }
    };

    const onRegisterClick = async () => {
        try {
            await addRequest({ pickupId, partnerId });
            alert.show('Påmelding til ekstrauttak ble registrert suksessfullt.', { type: types.SUCCESS });
            mutate();
        } catch {
            alert.show('Noe gikk galt, påmelding til ekstrauttaket ble ikke registrert.', { type: types.ERROR });
        }
    };

    // Selection of correct button
    let RenderedButton = <Button text="Meld deg på ekstrauttak" color="Green" onClick={onRegisterClick} width={180} />;
    if (request) {
        if (!selectedPartnerId) {
            RenderedButton = <Button text="Avventer svar" styling={`border: 2px solid ${Colors.Blue}`} width={180} />;
        } else {
            if (selectedPartnerId == partnerId) {
                RenderedButton = (
                    <Button text="Forspørsel godkjent" styling={`border: 2px solid ${Colors.Green}`} width={180} />
                );
            } else {
                RenderedButton = (
                    <Button text="Forspørsel avvist" styling={`border: 2px solid ${Colors.Red}`} width={180} />
                );
            }
        }
    }

    if (!request && isValidating) {
        return null;
    }

    return (
        <Wrapper>
            {RenderedButton}
            {request && !selectedPartnerId && (
                <DeleteButton onClick={onDeleteClick}>
                    <Cross height="1.5em" /> Meld av
                </DeleteButton>
            )}
        </Wrapper>
    );
};
