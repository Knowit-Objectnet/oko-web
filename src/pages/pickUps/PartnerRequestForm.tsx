import * as React from 'react';
import styled from 'styled-components';
import { ApiRequest, apiUrl } from '../../types';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Button } from '../../sharedComponents/Button';
import Cross from '../../assets/Cross.svg';
import { Colors } from '../../theme';
import { types, useAlert } from 'react-alert';
import { PostToAPI } from '../../utils/PostToAPI';
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
    selectedPartnerId?: number;
    pickupId: number;
}

export const PartnerRequestForm: React.FC<PartnerRequestFormProps> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const { data: apiRequest, isValidating } = useSWR<Array<ApiRequest>>(
        `${apiUrl}/requests/?pickupId=${props.pickupId}&partnerId=${props.partnerId}`,
        fetcher,
    );
    // Getting the apiRequest object if it isnt empty (its always 1 or empty]
    const request = apiRequest ? apiRequest[0] : undefined;

    const onRegisterClick = async () => {
        try {
            await PostToAPI(
                `${apiUrl}/requests`,
                { pickupId: props.pickupId, partnerId: props.partnerId },
                keycloak.token,
            );
            alert.show('Påmelding til ekstrauttak ble registrert suksessfullt.', { type: types.SUCCESS });
            mutate(`${apiUrl}/requests/?pickupId=${props.pickupId}&partnerId=${props.partnerId}`);
        } catch {
            alert.show('Noe gikk galt, påmelding til ekstrauttaket ble ikke registrert.', { type: types.ERROR });
        }
    };

    const onDeleteClick = async () => {
        try {
            await DeleteToAPI(
                `${apiUrl}/requests?pickupId=${props.pickupId}&partnerId=${props.partnerId}`,
                keycloak.token,
            );
            alert.show('Påmelding til ekstrauttak ble sletteet suksessfullt.', { type: types.SUCCESS });
            mutate(`${apiUrl}/requests/?pickupId=${props.pickupId}&partnerId=${props.partnerId}`);
        } catch {
            alert.show('Noe gikk galt, sletting av påmelding til ekstrauttaket ble ikke registrert.', {
                type: types.ERROR,
            });
        }
    };

    // Selection of correct button
    let RenderedButton = <Button text="Meld deg på ekstrauttak" color="Green" onClick={onRegisterClick} width={180} />;
    if (request) {
        if (!props.selectedPartnerId) {
            RenderedButton = <Button text="Avventer svar" styling={`border: 2px solid ${Colors.Blue}`} width={180} />;
        } else {
            if (props.selectedPartnerId == props.partnerId) {
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
            {request && !props.selectedPartnerId && (
                <DeleteButton onClick={onDeleteClick}>
                    <Cross height="1.5em" /> Meld av
                </DeleteButton>
            )}
        </Wrapper>
    );
};
