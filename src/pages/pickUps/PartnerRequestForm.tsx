import * as React from 'react';
import styled from 'styled-components';
import { ApiPickUp, ApiRequest, apiUrl } from '../../types';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Button } from '../../sharedComponents/Button';
import Cross from '../../assets/Cross.svg';
import { Colors } from '../../theme';
import { PostToAPI } from '../../utils/PostToAPI';
import { types, useAlert } from 'react-alert';
import { DeleteToAPI } from '../../utils/DeleteToAPI';
import { useKeycloak } from '@react-keycloak/web';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
`;

const DeleteButton = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
`;

interface PartnerRequestFormProps {
    partnerId: number;
    pickUp: ApiPickUp;
}

export const PartnerRequestForm: React.FC<PartnerRequestFormProps> = ({ pickUp, partnerId }) => {
    const selectedPartnerId = pickUp.chosenPartner?.id;
    const pickupId = pickUp.id;
    const [keycloak] = useKeycloak();
    const alert = useAlert();
    // Fetching data from API
    const { data: apiRequest, isValidating } = useSWR<Array<ApiRequest>>(
        `${apiUrl}/requests/?pickupId=${pickupId}&partnerId=${partnerId}`,
        fetcher,
    );
    // Getting the apiRequest object if it isnt empty (its always 1 or empty]
    const request = apiRequest ? apiRequest[0] : undefined;

    // Function to handle deletion of request
    const onDeleteClick = async () => {
        try {
            // Delete the request in the API
            await DeleteToAPI(`${apiUrl}/requests?pickupId=${pickupId}&partnerId=${partnerId}`, keycloak.token);
            alert.show('Påmelding til ekstrauttak ble sletteet suksessfullt.', { type: types.SUCCESS });

            // Revalidate
            mutate(`${apiUrl}/requests/?pickupId=${pickupId}&partnerId=${partnerId}`);
        } catch {
            alert.show('Noe gikk galt, sletting av påmelding til ekstrauttaket ble ikke registrert.', {
                type: types.ERROR,
            });
        }
    };

    // Function to handle registration of request
    const onRegisterClick = async () => {
        try {
            // Post to the API
            await PostToAPI(`${apiUrl}/requests`, { pickupId, partnerId }, keycloak.token);
            alert.show('Påmelding til ekstrauttak ble registrert suksessfullt.', { type: types.SUCCESS });

            // Revalidate
            mutate(`${apiUrl}/requests/?pickupId=${pickupId}&partnerId=${partnerId}`);
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

    // If it's still loading data then return nothing as to not render wrong button
    if (!apiRequest && isValidating) {
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
