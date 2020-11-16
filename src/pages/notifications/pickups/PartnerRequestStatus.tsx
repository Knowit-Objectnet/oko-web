import * as React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Cross from '../../../assets/Cross.svg';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPickUp } from '../../../api/PickUpService';
import { ApiRequest, apiUrl } from '../../../types';
import { fetcher } from '../../../utils/fetcher';
import { PostToAPI } from '../../../utils/PostToAPI';
import { DeleteToAPI } from '../../../utils/DeleteToAPI';
import { Button } from '../../../sharedComponents/Button';

const Wrapper = styled.div`
    padding: 0.625rem;
    display: flex;
`;

const CancelButton = styled.button`
    margin-left: 10px;
    display: flex;
    font-weight: bold;
    align-items: center;
    border: none;
    background: none;
    min-height: 45px;
    font-size: 0.875rem;

    & > svg {
        margin-right: 2px;
        height: 1.5rem;
    }
`;

const Status = styled.div`
    font-weight: bold;
    font-size: 0.875rem;
    min-height: 3rem;
    text-align: center;
    padding: 0.75rem 1rem;
    background: ${(props) => props.theme.colors.White};
    min-width: 200px;
    border: 0.125rem solid;
`;

const AwaitingStatus = styled(Status)`
    border-color: ${(props) => props.theme.colors.Blue};
`;

const ApprovedStatus = styled(Status)`
    border-color: ${(props) => props.theme.colors.Green};
`;

const RejectStatus = styled(Status)`
    border-color: ${(props) => props.theme.colors.Red};
`;

interface Props {
    pickUp: ApiPickUp;
}

export const PartnerRequestStatus: React.FC<Props> = ({ pickUp }) => {
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.GroupID;

    const alert = useAlert();

    const { data: request, isValidating, mutate } = useSWR<Array<ApiRequest>>(
        `${apiUrl}/requests/?pickupId=${pickUp.id}&partnerId=${userId}`,
        fetcher,
    );

    const handleRequestRegistrationClick = async () => {
        try {
            await PostToAPI(`${apiUrl}/requests`, { pickupId: pickUp.id, partnerId: userId }, keycloak.token);
            alert.show('Påmelding til ekstrauttak ble registrert suksessfullt.', { type: types.SUCCESS });
            mutate();
        } catch {
            alert.show('Noe gikk galt, påmelding til ekstrauttaket ble ikke registrert.', { type: types.ERROR });
        }
    };

    const handleRequestCancellationClick = async () => {
        try {
            await DeleteToAPI(`${apiUrl}/requests?pickupId=${pickUp.id}&partnerId=${userId}`, keycloak.token);
            alert.show('Påmelding til ekstrauttak ble slettet suksessfullt.', { type: types.SUCCESS });
            mutate();
        } catch {
            alert.show('Noe gikk galt, sletting av påmelding til ekstrauttaket ble ikke registrert.', {
                type: types.ERROR,
            });
        }
    };

    const getRequestStatusField = () => {
        const pickUpIsOpenForRequest = !pickUp.chosenPartner;
        const userHasRequest = !!request?.[0];
        const userCanMakeRequest = pickUpIsOpenForRequest && !userHasRequest;
        const userRequestAwaiting = userHasRequest && pickUpIsOpenForRequest;
        const userRequestApproved = pickUp.chosenPartner?.id === userId;
        // TODO: explicit rejection of a partner request is not supported by backend yet.
        //  When implemented, the following condition needs to be rewritten.
        const userRequestRejected = userHasRequest && !userRequestApproved;

        if (userCanMakeRequest) {
            return (
                <Button text="Meld deg på ekstrauttak" variant="positive" onClick={handleRequestRegistrationClick} />
            );
        } else if (userRequestAwaiting) {
            return (
                <>
                    <AwaitingStatus>Avventer svar</AwaitingStatus>
                    <CancelButton onClick={handleRequestCancellationClick}>
                        <Cross /> Meld av
                    </CancelButton>
                </>
            );
        } else if (userRequestApproved) {
            return <ApprovedStatus>Forespørsel godkjent</ApprovedStatus>;
        } else if (userRequestRejected) {
            return <RejectStatus>Forespørsel avvist</RejectStatus>;
        }
        return <RejectStatus>Påmelding stengt</RejectStatus>;
    };

    return !request && isValidating ? null : <Wrapper>{getRequestStatusField()}</Wrapper>;
};
