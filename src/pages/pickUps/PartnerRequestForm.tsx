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
    pickupId: number;
    registerRequest: (pickupId: number, partnerId: number) => void;
    deleteRequest: (pickupId: number, partnerId: number) => void;
}

export const PartnerRequestForm: React.FC<PartnerRequestFormProps> = (props) => {
    const { data: apiRequest, isValidating, mutate } = useSWR<Array<ApiRequest>>(
        `${apiUrl}/requests/?pickupId=${props.pickupId}&partnerId=${props.partnerId}`,
        fetcher,
    );
    const request = apiRequest ? apiRequest[0] : undefined;

    const onDeleteClick = () => {
        props.deleteRequest(props.pickupId, props.partnerId);
    };

    const onRegisterClick = () => {
        props.registerRequest(props.pickupId, props.partnerId);
    };

    let RenderedButton = <Button text="Meld deg på ekstrauttak" color="Green" onClick={onRegisterClick} width={180} />;
    if (request) {
        if (!request.pickup.chosenPartner) {
            RenderedButton = <Button text="Avventer svar" styling={`border: 2px solid ${Colors.Blue}`} width={180} />;
        } else {
            if (request.pickup.chosenPartner.id == props.partnerId) {
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

    return (
        <Wrapper>
            {RenderedButton}
            {request && !request.pickup.chosenPartner ? (
                <DeleteButton onClick={onDeleteClick}>
                    <Cross height="1.5em" /> Meld av
                </DeleteButton>
            ) : null}
        </Wrapper>
    );
};
