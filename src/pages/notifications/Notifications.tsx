import * as React from 'react';
import styled from 'styled-components';
import { Roles } from '../../types';
import Plus from '../../assets/Plus.svg';
import { NewPickUp } from '../../sharedComponents/Events/NewPickUp';
import { useKeycloak } from '@react-keycloak/web';
import useModal from '../../sharedComponents/Modal/useModal';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { Helmet } from 'react-helmet';
import { FloatingActionButton } from '../../sharedComponents/FloatingActionButton';
import { PickUpsList } from './pickups/PickUpsList';

const Wrapper = styled.div`
    position: relative;
`;

const AddPickUpButtonContainer = styled.div`
    position: absolute;
    top: 40px;
    right: 50px;
`;

const PageContent = styled.section`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 40px 0 50px;
`;

export const Notifications: React.FC = () => {
    const modal = useModal();

    const { keycloak } = useKeycloak();
    const userIsStation = keycloak.hasRealmRole(Roles.Ambassador);
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const showNewPickUpModal = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<NewPickUp start={start} end={end} afterSubmit={closeModalOnSuccess} />);
    };

    return (
        <>
            <Helmet>
                <title>{userIsAdmin ? 'Oversikt' : 'Varsler'}</title>
            </Helmet>
            <Wrapper>
                {userIsStation && (
                    <AddPickUpButtonContainer>
                        <FloatingActionButton
                            variant="positive"
                            label="Nytt ekstrauttak"
                            icon={<Plus />}
                            onClick={showNewPickUpModal}
                        />
                    </AddPickUpButtonContainer>
                )}
                <PageContent>
                    <PickUpsList />
                </PageContent>
            </Wrapper>
        </>
    );
};
