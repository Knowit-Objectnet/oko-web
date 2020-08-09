import * as React from 'react';
import styled from 'styled-components';
import { ApiRequest, apiUrl, Colors } from '../../types';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { Button } from '../../sharedComponents/Button';
import Cross from '../../assets/Cross.svg';

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
    registerRequest: (pickupId: number, partnerId: number) => void;
    deleteRequest: (pickupId: number, partnerId: number) => void;
}

export const PartnerRequestForm: React.FC<PartnerRequestFormProps> = (props) => {
    // Fetching data from API
    const { data: apiRequest, isValidating } = useSWR<Array<ApiRequest>>(
        `${apiUrl}/requests/?pickupId=${props.pickupId}&partnerId=${props.partnerId}`,
        fetcher,
    );
    // Getting the apiRequest object if it isnt empty (its always 1 or empty]
    const request = apiRequest ? apiRequest[0] : undefined;

    // Function to handle deletion of request
    const onDeleteClick = () => {
        props.deleteRequest(props.pickupId, props.partnerId);
    };

    // Function to handle registration of request
    const onRegisterClick = () => {
        props.registerRequest(props.pickupId, props.partnerId);
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
