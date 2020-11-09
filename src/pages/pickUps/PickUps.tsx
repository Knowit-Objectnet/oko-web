import * as React from 'react';
import styled from 'styled-components';
import { Roles } from '../../types';
import { PickUpRequest } from './PickUpRequest';
import Plus from '../../assets/Plus.svg';
import { ExtraEvent } from '../../sharedComponents/Events/ExtraEvent';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { Loading } from '../../sharedComponents/Loading';
import useModal from '../../sharedComponents/Modal/useModal';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { Helmet } from 'react-helmet';
import { usePickUps } from '../../api/hooks/usePickUps';
import { mutate } from 'swr';

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
    background-color: ${(props) => props.theme.colors.LightBeige};
`;

const Button = styled.div`
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: ${(props) => props.theme.colors.Green};
    border-radius: 50%;
    box-sizing: border-box;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

export const PickUps: React.FC = () => {
    const modal = useModal();

    const { keycloak } = useKeycloak();
    const userIsStation = keycloak.hasRealmRole(Roles.Ambassador);

    const { data: pickUps, isLoading } = usePickUps();
    const sortedPickups = pickUps?.sort((pickUpA, pickUpB) => {
        const timeA = new Date(pickUpA.startDateTime);
        const timeB = new Date(pickUpB.startDateTime);
        const idA = pickUpA.id;
        const idB = pickUpB.id;

        if (timeA == timeB) {
            return idB - idA;
        } else {
            return timeB.getTime() - timeA.getTime();
        }
    });

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const showNewPickUpModal = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<ExtraEvent start={start} end={end} afterSubmit={closeModalOnSuccess} />);
    };

    return (
        <>
            <Helmet>
                <title>Ektrauttak</title>
            </Helmet>
            <Wrapper>
                {userIsStation && (
                    <Item>
                        <Description>Ektrauttak</Description>
                        <Button onClick={showNewPickUpModal}>
                            <Plus height="100%" />
                        </Button>
                    </Item>
                )}
                <Content>
                    <h2>Forespørsler</h2>
                    <Explanation>
                        <ExplanationLocation>Sendt av:</ExplanationLocation>
                        <ExplanationPickup>Uttak:</ExplanationPickup>
                        <ExplanationLast>{userIsStation ? 'Handlingsalternativer:' : 'Påmeldte:'}</ExplanationLast>
                    </Explanation>
                    <PickUpsList>
                        {isLoading ? (
                            <Loading text="Laster inn data..." />
                        ) : (
                            sortedPickups?.map((pickUp) => (
                                <PickUpRequest key={`Pickup: ${pickUp.id}`} pickUp={pickUp} />
                            ))
                        )}
                    </PickUpsList>
                </Content>
            </Wrapper>
        </>
    );
};
