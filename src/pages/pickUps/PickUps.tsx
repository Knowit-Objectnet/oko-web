import * as React from 'react';
import styled from 'styled-components';
import useSWR, { mutate } from 'swr';
import { ApiPartner, ApiPickUp, apiUrl, Colors, PickUp, Roles } from '../../types';
import { fetcher } from '../../utils/fetcher';
import { useEffect, useState } from 'react';
import { PickUpRequest } from './PickUpRequest';
import Plus from '../../assets/Plus.svg';
import { ExtraEvent } from '../calendar/events/ExtraEvent';
import { PostToAPI } from '../../utils/PostToAPI';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { DeleteToAPI } from '../../utils/DeleteToAPI';
import { PatchToAPI } from '../../utils/PatchToAPI';
import { Loading } from '../../sharedComponents/Loading';
import useModal from '../../sharedComponents/Modal/useModal';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    margin-top: 90px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    height: 100%;
    overflow: auto;
`;

const Explanation = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const ExplanationLocation = styled.div`
    width: 150px;
`;

const ExplanationPickup = styled.div`
    flex: 1;
`;

const ExplanationLast = styled.div`
    width: 350px;
`;

const PickUpsList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const Item = styled.div`
    position: absolute;
    top: 40px;
    right: 50px;
    display: flex;
    flex-direction: row;
    &:not(:last-child) {
        margin-bottom: 25px;
    }
`;

const Description = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    background-color: ${Colors.LightBeige};
`;

const Button = styled.div`
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: ${Colors.Green};
    border-radius: 50%;
    box-sizing: border-box;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

export const PickUps: React.FC = () => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Alert dispatcher
    const alert = useAlert();
    // Modal dispatcher
    const modal = useModal();
    // Fetch data pickups/extraEvents from aPI
    const { data: apiPickUps, isValidating } = useSWR<Array<ApiPickUp>>(`${apiUrl}/pickups/`, fetcher);

    // pickups state
    const [pickUps, setPickUps] = useState<Array<PickUp>>([]);

    // update the pickups state when data is fetched
    useEffect(() => {
        const _pickUps: Array<PickUp> = apiPickUps
            ? apiPickUps.map((pickUp) => {
                  return {
                      ...pickUp,
                      startDateTime: new Date(pickUp.startDateTime),
                      endDateTime: new Date(pickUp.endDateTime),
                  };
              })
            : [];
        setPickUps(_pickUps);
    }, [apiPickUps]);

    const beforeExtraEventSubmission = (key: string, newPickup: ApiPickUp) => {
        // Old pickups (needed to spread it)
        const oldPickups = apiPickUps || [];

        // Update local state
        mutate(key, [...oldPickups, newPickup], false);
    };

    const afterExtraEventSubmission = (successful: boolean, key: string) => {
        if (successful) {
            // Give user feedback and close modal
            alert.show('Et nytt ekstrauttak ble lagt til suksessfullt.', { type: types.SUCCESS });
            modal.remove();

            // Revalidate
            mutate(key);
        } else {
            // Give user feedback
            alert.show('Noe gikk galt, ekstrauttaket ble ikke lagt til.', { type: types.ERROR });
        }
    };

    const pickupReject = async (partner: ApiPartner, pickupId: number) => {
        /* TODO: Make this function when the backend supports it */
    };

    // Function to approve a request for a pickup
    const pickupApprove = async (partner: ApiPartner, pickupId: number) => {
        try {
            // Update local state
            if (apiPickUps) {
                const updatedExtraEvent = apiPickUps.find((pickUp) => pickUp.id === pickupId);
                const filteredExtraEvents = apiPickUps.filter((pickUp) => pickUp.id !== pickupId);
                const newExtraEvents = [
                    ...filteredExtraEvents,
                    {
                        ...updatedExtraEvent,
                        chosenPartner: partner,
                    },
                ];
                // Update local state
                mutate(`${apiUrl}/pickups/`, newExtraEvents, false);
            }

            // Update pickup in API
            await PatchToAPI(`${apiUrl}/pickups`, { id: pickupId, chosenPartnerId: partner.id }, keycloak.token);
            alert.show('Valg av sam.partner til ekstrauttak ble registrert suksessfullt.', { type: types.SUCCESS });

            // Revalidate
            mutate(`${apiUrl}/pickups/`);
        } catch {
            alert.show('Noe gikk galt, valg av sam.partner til ekstrauttak ble ikke registrert.', {
                type: types.ERROR,
            });
        }
    };

    // Function to submit new request for pickup
    const requestSubmission = async (pickupId: number, partnerId: number) => {
        try {
            // Date to mutate the local state with
            const localMutation = {
                pickup: {
                    id: pickupId,
                    startDateTime: '',
                    endDateTime: '',
                    description: '',
                    station: {
                        id: -1,
                        name: '',
                        openingTime: '',
                        closingTime: '',
                    },
                    chosenPartner: null,
                },
                partner: {
                    id: partnerId,
                    name: '',
                    description: '',
                    phone: '',
                    email: '',
                },
            };

            // Mutate the local data
            mutate(`${apiUrl}/requests/?pickupId=${pickupId}&partnerId=${partnerId}`, [localMutation], false);

            // Post to the API
            await PostToAPI(`${apiUrl}/requests`, { pickupId: pickupId, partnerId: partnerId }, keycloak.token);
            alert.show('Påmelding til ekstrauttak ble registrert suksessfullt.', { type: types.SUCCESS });

            // Revalidate
            mutate(`${apiUrl}/requests/?pickupId=${pickupId}&partnerId=${partnerId}`);
        } catch {
            alert.show('Noe gikk galt, påmelding til ekstrauttaket ble ikke registrert.', { type: types.ERROR });
        }
    };

    // Function to delete request for pickup
    const requestDeletion = async (pickupId: number, partnerId: number) => {
        try {
            // Mutate the local data
            mutate(`${apiUrl}/requests/?pickupId=${pickupId}&partnerId=${partnerId}`, [], false);

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

    // On click function for new extraevent/pickup button
    const onClick = () => {
        modal.show(
            <ExtraEvent
                end={new Date()}
                beforeSubmit={beforeExtraEventSubmission}
                afterSubmit={afterExtraEventSubmission}
                start={new Date()}
            />,
        );
    };

    return (
        <Wrapper>
            {keycloak.hasRealmRole(Roles.Ambassador) ? (
                <Item>
                    <Description>Ektrauttak</Description>
                    <Button onClick={onClick}>
                        <Plus height="100%" />
                    </Button>
                </Item>
            ) : null}
            <Content>
                <h2>Forespørsler</h2>
                <Explanation>
                    <ExplanationLocation>Sendt av:</ExplanationLocation>
                    <ExplanationPickup>Uttak:</ExplanationPickup>
                    <ExplanationLast>
                        {keycloak.hasRealmRole(Roles.Ambassador) ? 'Handlingsalternativer:' : 'Påmeldte:'}
                    </ExplanationLast>
                </Explanation>
                <PickUpsList>
                    {!apiPickUps && isValidating ? (
                        <Loading text="Laster inn data..." />
                    ) : (
                        pickUps.map((pickUp) => (
                            <PickUpRequest
                                key={`Pickup: ${pickUp.id}`}
                                {...pickUp}
                                groupId={keycloak.tokenParsed.GroupID}
                                deleteRequest={requestDeletion}
                                registerRequest={requestSubmission}
                                onReject={pickupReject}
                                onApprove={pickupApprove}
                            />
                        ))
                    )}
                </PickUpsList>
            </Content>
        </Wrapper>
    );
};
