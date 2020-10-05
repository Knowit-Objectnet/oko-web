import * as React from 'react';
import styled from 'styled-components';
import { Roles } from '../../types';
import { PickUpInfo } from './PickUpInfo';
import Plus from '../../assets/Plus.svg';
import { ExtraEvent } from '../../sharedComponents/Events/ExtraEvent';
import { useKeycloak } from '@react-keycloak/web';
import { Loading } from '../../sharedComponents/Loading';
import useModal from '../../sharedComponents/Modal/useModal';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { Helmet } from 'react-helmet';
import { usePickUps } from '../../services/usePickUps';

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
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Modal dispatcher
    const modal = useModal();
    // Fetch data pickups/extraEvents from aPI
    const { data: pickUps, isValidating } = usePickUps();

    const sortedPickUps = (pickUps ?? []).sort((pickUpA, pickUpB) => {
        const pickUpAstart = new Date(pickUpA.startDateTime);
        const pickUpBstart = new Date(pickUpB.startDateTime);

        if (pickUpAstart > pickUpBstart) {
            return -1;
        }
        if (pickUpAstart < pickUpBstart) {
            return 1;
        }
        return 0;

        // TODO: the pickUps were also sorted by ID. Why is that, and should it be re-implemented?
    });

    // On click function for new extraevent/pickup button
    const showNewExtraEventModal = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<ExtraEvent end={end} afterSubmit={afterExtraEventSubmission} start={start} />);
    };

    const afterExtraEventSubmission = (successful: boolean, key: string) => {
        if (successful) {
            modal.remove();
        }
    };

    return (
        <>
            <Helmet>
                <title>Ektrauttak</title>
            </Helmet>
            <Wrapper>
                {keycloak.hasRealmRole(Roles.Ambassador) && (
                    <Item>
                        <Description>Ektrauttak</Description>
                        <Button onClick={showNewExtraEventModal}>
                            <Plus height="100%" />
                        </Button>
                    </Item>
                )}
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
                        {!pickUps && isValidating ? (
                            <Loading text="Laster inn data..." />
                        ) : (
                            sortedPickUps.map((pickUp) => <PickUpInfo key={pickUp.id} pickUp={pickUp} />)
                        )}
                    </PickUpsList>
                </Content>
            </Wrapper>
        </>
    );
};
