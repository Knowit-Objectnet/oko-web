import * as React from 'react';
import styled from 'styled-components';
import { Roles } from '../../types';
import { PickUpRequest } from './PickUpRequest';
import Plus from '../../assets/Plus.svg';
import { ExtraEvent } from '../../sharedComponents/Events/ExtraEvent';
import { useKeycloak } from '@react-keycloak/web';
import { Loading } from '../../sharedComponents/Loading';
import useModal from '../../sharedComponents/Modal/useModal';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { Helmet } from 'react-helmet';
import { usePickUps } from '../../api/hooks/usePickUps';
import { FloatingActionButton } from '../../sharedComponents/FloatingActionButton';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    padding-top: 90px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    height: 100%;
`;

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const HeaderLeft = styled.div`
    flex-basis: 150px;
`;

const HeaderCenter = styled.div`
    flex: 1;
`;

const HeaderRight = styled.div`
    flex-basis: 350px;
`;

const AddPickUpButtonContainer = styled.div`
    position: absolute;
    top: 40px;
    right: 50px;
`;

const PickUpList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
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
                <title>Ekstrauttak</title>
            </Helmet>
            <Wrapper>
                {userIsStation && (
                    <AddPickUpButtonContainer>
                        <FloatingActionButton
                            label="Nytt ekstrauttak"
                            icon={<Plus />}
                            onClick={showNewPickUpModal}
                            variant="Positive"
                        />
                    </AddPickUpButtonContainer>
                )}
                <Content>
                    <h2>Forespørsler</h2>
                    <HeaderRow>
                        <HeaderLeft>Sendt av:</HeaderLeft>
                        <HeaderCenter>Uttak:</HeaderCenter>
                        <HeaderRight>{userIsStation ? 'Handlingsalternativer:' : 'Påmeldte:'}</HeaderRight>
                    </HeaderRow>
                    <PickUpList>
                        {isLoading ? (
                            <Loading text="Laster inn data..." />
                        ) : (
                            sortedPickups?.map((pickUp) => <PickUpRequest key={pickUp.id} pickUp={pickUp} />)
                        )}
                    </PickUpList>
                </Content>
            </Wrapper>
        </>
    );
};
